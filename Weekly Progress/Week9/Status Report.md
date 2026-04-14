# ShelfSight

**Week 9 | April 8, 2026 - April 14, 2026**

**Leader:** Chimezie Nnawuihe
---

| Name | Details |
|------|---------|
| **Marc Manoj** | **Tasks completed** |
| | • Completed circulation API alignment so check-out and check-in workflows now support consistent title, author, and ISBN search behavior using existing endpoints/services |
| | • Aligned backend loan response payloads with frontend circulation expectations to remove search mismatches and reduce mapping inconsistencies |
| | • Updated frontend circulation state/search usage to rely on the aligned API fields and backend search semantics for more reliable lookup during checkout/check-in |
| | • Added targeted backend tests for loan query forwarding and fetchLoans search/payload behavior, then re-ran backend/frontend tests and builds to confirm stability |
| **Time Spent:** 10 hours | **Planned tasks for next week:** |
| | • Support follow-up QA for circulation edge cases and monitor for regressions |
| | • Expand automated coverage for circulation filtering and transaction history flows |
| | **Any issues or challenges:** |
| | • Initial frontend build validation failed due to local dependency resolution; resolved after installing project dependencies and re-running full validation |

---

**Total Time Spent:** 10 hours

**Summary:**
Week 9 focused on circulation workflow stability and API consistency. The loan APIs were refined to support search across title, author, and ISBN while keeping existing endpoint structure. Loan response payloads were standardized and aligned with frontend expectations to eliminate field mismatches that affected checkout/check-in search behavior. Additional backend tests were added for query forwarding and service-level search/payload behavior, and full test/build verification was completed across both backend and frontend.
