/**
 * Certifications — real, verifiable credentials shown in the capped/scrollable
 * Certificates section. Source PDFs live in docs/profile/certificates/ and are
 * copied into /assets/certificates/ so each row links to the actual statement
 * of accomplishment.
 *
 * Fields:
 *   name   — course/credential title
 *   issuer — awarding body
 *   year   — display token in the right-hand slot
 *   date   — human-readable completion date (title/tooltip detail)
 *   file   — public path to the certificate PDF (opens in a new tab)
 *
 * Ordered most-recent-first to match the section's descending rhythm.
 */
module.exports = [
  {
    name: "Exploratory Data Analysis in SQL",
    issuer: "DataCamp",
    year: "2026",
    date: "Jul 2026",
    file: "/assets/certificates/exploratory-data-analysis-in-sql.pdf",
  },
  {
    name: "Data Manipulation in SQL",
    issuer: "DataCamp",
    year: "2026",
    date: "Jul 2026",
    file: "/assets/certificates/data-manipulation-in-sql.pdf",
  },
  {
    name: "Joining Data in SQL",
    issuer: "DataCamp",
    year: "2026",
    date: "Jul 2026",
    file: "/assets/certificates/joining-data-in-sql.pdf",
  },
  {
    name: "Intermediate SQL",
    issuer: "DataCamp",
    year: "2026",
    date: "Jun 2026",
    file: "/assets/certificates/intermediate-sql.pdf",
  },
  {
    name: "Introduction to SQL",
    issuer: "DataCamp",
    year: "2026",
    date: "Jun 2026",
    file: "/assets/certificates/introduction-to-sql.pdf",
  },
];
