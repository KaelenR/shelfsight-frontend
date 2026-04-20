# ShelfSight

**Week 10 | April 15, 2026 - April 21, 2026**

**Leader:** Chimezie Nnawuihe
---

| Name | Details |
|------|---------|
| **Marc Manoj** | **Tasks completed:** |
| | â€¢ Implemented the bulk upload workflow. Built the backend functionality (`POST /books/bulk-file`) utilizing `multer` and `xlsx` to parse spreadsheet rows into recognizable library metadata directly from the frontend request. |
| | â€¢ Developed a UI modal in the catalog dashboard that allows admin users to seamlessly attach and upload Excel `.xlsx` or `.csv` files. |
| | â€¢ Engineered the backend ingestion service to properly validate ISBNs, titles, and authors across batches. Implemented database upsert logic to gracefully handle duplicate entries and failure recovery without breaking the entire upload transaction. |
| | â€¢ Created a direct-to-database seeding script (`scripts/populate-db.ts`) utilizing `@faker-js/faker`. This bypasses HTTP limitations to generate and insert up to 100k+ realistic books and circulation copies, which is critical for stress-testing our search indexing and checkout flows. |
| | â€¢ Authored `docs/task1/README.md` to document the bulk scale constraints, technical approaches, and execution strategies. |
| **Time Spent:** 10 hours | **Planned tasks for next week:** |
| | â€¢ Support QA testing for bulk upload edge cases and monitor for catalog indexing regressions |
| | â€¢ Assist with final project optimizations and multi-tenant handoff |
| | **Any issues or challenges:** |
| | â€¢ Resolving Typescript/NextJS build constraints surrounding FormData mapping off the backend required adjusting the payload logic between Next's Server Context and React Context |

---

| Name | Details |
|------|---------|
| **Mirza Baig** | **Tasks completed:** |
| | â€¢ To be added later |
| **Time Spent:** 0 hours | **Planned tasks for next week:** |
| | â€¢ To be added later |
| | **Any issues or challenges:** |
| | â€¢ None reported yet |

---

| Name | Details |
|------|---------|
| **Syed Hasan** | **Tasks completed:** |
| | â€¢ To be added later |
| **Time Spent:** 0 hours | **Planned tasks for next week:** |
| | â€¢ To be added later |
| | **Any issues or challenges:** |
| | â€¢ None reported yet |

---

| Name | Details |
|------|---------|
| **Kaelen Raible** | **Tasks completed:** |
| | â€¢ To be added later |
| **Time Spent:** 0 hours | **Planned tasks for next week:** |
| | â€¢ To be added later |
| | **Any issues or challenges:** |
| | â€¢ None reported yet |

---

| Name | Details |
|------|---------|
| **Chimezie Nnawuihe** | **Tasks completed:** |
| | â€¢ To be added later |
| **Time Spent:** 0 hours | **Planned tasks for next week:** |
| | â€¢ To be added later |
| | **Any issues or challenges:** |
| | â€¢ None reported yet |

---

**Total Time Spent:** 10 hours

**Summary:**
Week 10 focused primarily on the introduction of bulk upload capabilities and massive data population scaling protocols. Marc implemented a high-volume data ingestion pipeline that parses uploaded Excel/.csv workbooks into the backend database with built-in upsert redundancy. This was validated alongside an offline data population script using Faker representation capable of rapidly seeding 100,000+ randomized records directly into Postgres, which effectively hardens our database indexes, searching components, and circulation checkouts. Team summary sections for Mirza, Syed, Kaelen, and Chimezie will be detailed later.