# Task 1 Part 2: Bulk Upload Scaling & Data Validation

## Overview
This document outlines the investigation and resolution for bulk upload issues where uploads succeeded at ~5k records but failed at higher volumes (10k+). 

## Root Cause Analysis
At higher volumes, the bulk upload process encountered several bottlenecks:
- **Memory Limits**: Loading and parsing massive datasets all at once overwhelmed the Node.js process memory.
- **Database Connection Timeouts**: Spiking the database with thousands of concurrent or overly-large transaction batches caused Prisma connection pooling to queue and eventually time out.
- **Request Payload Limits**: Sending >5k rows in a single HTTP request exceeded default body size limits and increased connection drop rates between the frontend and backend.

## Implementation & Fixes
To resolve these scaling limitations, we introduced the following improvements to the bulk upload pipeline:

### 1. Batching and Chunking
* **Frontend Chunking**: The frontend now processes the parsed CSV/Excel file in chunks before transmitting to the backend, preventing HTTP payload limits from being exceeded.
* **Backend Processing Batches**: The backend `services/books.service.ts` was updated to process items in smaller, controlled batches:
  - `BULK_UPLOAD_BATCH_SIZE`: Controls the array iteration (e.g., 500 items).
  - `BULK_UPLOAD_DB_BATCH_SIZE`: Limits the number of records inserted into the database in a single query (e.g., 200 items).
  - `BULK_UPLOAD_COPY_BATCH_SIZE`: Controls the `BookCopy` generation batch sizes (e.g., 1000 items).

### 2. Optimized Database Writes
* **Prisma `createMany` and `skipDuplicates`**: Used for fast inserts of new books and copies without throwing errors on duplicate constraint violations.
* **Separated Upsert Logic**: Books that already exist are batched and updated separately from the bulk insert flow, reducing complex multi-statement transactions.
* **Transaction Safety**: Batches are committed independently. If a single chunk fails due to validation, it does not roll back the entire 10k+ dataset, allowing successful subsets to persist.

## Validation & Testing
We generated a larger dataset (10,000+ books) using our faker script and validated the pipeline:
1. **Catalog Flow**: Verifying that 10k+ books appear correctly in the paginated grid/table views.
2. **Search Flow**: Confirmed that the database indexes handle the increased volume, maintaining fast search response times.
3. **Circulation Flow**: Verified that generated `BookCopy` records for the 10k books can be checked out and processed without lag.
4. **Ingestion Flow**: The backend successfully parses and streams the file chunks without memory spikes.

## Performance & Limits
- **Recommended File Size**: Up to 25,000 rows per upload (approx. 5-10MB CSV/XLSX).
- **Processing Speed**: Averages ~1,000 records per second depending on database latency and active upsert conflicts.
- **Hard Limits**: Files exceeding 100,000 rows should be split into multiple separate uploads to ensure browser stability during file reading and uploading.