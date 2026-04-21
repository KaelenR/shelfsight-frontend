# Task 1: Bulk Upload Documentation

## Approach
Our approach to the bulk upload feature for the catalog was designed to provide a seamless and robust experience for administrators importing new books.

1.  **File Format Support**: We support both `.csv` and `.json` file formats.
2.  **Client-Side Parsing for CSV**: For CSV files, we utilize `papaparse` on the client side to parse the file contents in the browser. This allows us to validate the data structure before sending it to the server, providing immediate feedback if the file is malformed.
3.  **Data Transformation**: After parsing the CSV, we transform the flat row data into the nested JSON structure expected by our backend API (e.g., mapping authors, categories, and inventory details).
4.  **Direct JSON Upload**: For JSON files, we read the contents as text and parse it directly, assuming it matches the expected array of book objects.
5.  **Batched/Single Request**: The transformed data is sent to the backend ingestion endpoint (`/api/ingest/books`) in a single payload. If the backend supports chunking, this could be adapted to send chunks to avoid request size limits.
6.  **User Experience**: The UI features a drag-and-drop zone using `react-dropzone` and provides clear error messages and success notifications using a toast system. 

## Limitations
*   **Large File Handling**: Client-side parsing of extremely large CSV files may cause the browser to freeze momentarily or crash if memory limits are exceeded. Parsing is done in a synchronous block or loads the entire file into memory before sending.
*   **Request Size Limits**: Since the entire array of parsed books is sent in a single HTTP request, huge catalogs might exceed the backend's payload size limit (e.g., typical 1MB or 10MB limits in server configs).
*   **Partial Failures**: The current design assumes an all-or-nothing approach for the upload on the backend, or doesn't provide granular row-by-row error reporting back to the user if only a few specific books fail validation during ingestion.
*   **Schema Rigidity**: The CSV parsing logic currently expects specific column names. If an administrator uploads a CSV with slightly different headers, the import will fail to map the data correctly.

## Bulk Upload Troubleshooting & Fixes

During the development and testing of the bulk upload feature, we encountered and resolved several critical issues to ensure a robust ingestion pipeline:

1. **Frontend API Payload Formatting**: The initial implementation used `apiFetch` which incorrectly stringified the `FormData` object into an empty JSON `{}`. We updated the upload component to use `apiUpload`, which correctly preserves the `multipart/form-data` payload so the backend receives the file.
2. **Unhandled Backend Error Masking**: When the backend failed to receive a file (due to the above), it threw a generic standard JavaScript error. This was captured by our error handler as a 500 Internal Server Error, masking the actual issue. We refactored `bulkUploadFile` to throw a proper `AppError` for missing files.
3. **CSV Column Mapping**: The database expected camelCase keys (e.g., `publishYear`, `deweyDecimal`), but the uploaded CSVs contained capitalized headers with spaces (e.g., `Publication Year`, `Dewey Decimal`). We added a robust mapping layer in `books.controller.ts` to normalize incoming spreadsheet columns to the expected backend model format.
4. **Strict Type Validation Mismatches**: Spreadsheets often pass numeric strings (like `2016` for year or `978...` for ISBN) as raw integers. Prisma strict-typing rejected these inserts. We updated `books.service.ts` to explicitly cast these fields (`publishYear` and `isbn` to string, and `pageCount` to carefully parsed integers).
5. **Database Schema Synchronization**: The schema had been updated with new fields (`language`, `pageCount`) and `pg_trgm` performance indexes, but these were not pushed to the live database. This caused silent Postgres database errors during the upsert transaction, leading to "Failed to import" results despite a 200 OK API response. We enabled the `pg_trgm` extension on the database and ran `prisma db push` to synchronize the schema.

## Testing Strategy

To validate the bulk ingest pipeline, we used Gemini to generate synthetic CSV test data:
*   **Short Testing (5 books)**: A small dataset (`library_test_short.csv`) was used for rapid iterative testing to verify that the file uploading, column mapping, and database field types were functioning correctly.
*   **Stress Testing (150 books)**: A larger dataset was generated to stress test the ingestion endpoint, verifying that the batching logic in the service, transaction handling, and database insertion limits could successfully process a larger volume of records without timing out or failing.
