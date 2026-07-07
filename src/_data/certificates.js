/**
 * Certifications — real, verifiable credentials shown in the capped/scrollable
 * Certificates section. Source files live in docs/profile/ (DataCamp PDFs under
 * certificates/, Boot.dev PNGs under bootdotdev/) and are copied into
 * /assets/certificates/ so each row links to the actual statement of
 * accomplishment.
 *
 * Grouped by track so the section stays legible as more technologies land.
 * Each group is a labelled cluster (SQL, Python, …); add a new object to
 * `groups` when a new track begins instead of mixing everything into one list.
 *
 * Group fields:
 *   label — track name shown on the divider row (e.g. "SQL")
 *   items — credentials in the group, most-recent-first
 *
 * Item fields:
 *   name   — course/credential title
 *   issuer — awarding body
 *   year   — display token in the right-hand slot
 *   date   — human-readable completion date (title/tooltip detail)
 *   file   — public path to the certificate PDF (opens in a new tab)
 *
 * Groups are ordered most-recent-first; items within a group likewise.
 */
const groups = [
  {
    label: "SQL",
    items: [
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
      {
        name: "Learn SQL",
        issuer: "Boot.dev",
        year: "2026",
        date: "May 2026",
        file: "/assets/certificates/learn-sql.png",
      },
    ],
  },
  {
    label: "Python",
    items: [
      {
        name: "Learn Object-Oriented Programming in Python",
        issuer: "Boot.dev",
        year: "2026",
        date: "Jul 2026",
        file: "/assets/certificates/learn-oop-in-python.png",
      },
      {
        name: "Introduction to Python",
        issuer: "Boot.dev",
        year: "2026",
        date: "Jun 2026",
        file: "/assets/certificates/introduction-to-python.png",
      },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      {
        name: "Learn Linux",
        issuer: "Boot.dev",
        year: "2026",
        date: "Jun 2026",
        file: "/assets/certificates/learn-linux.png",
      },
      {
        name: "Learn AWS",
        issuer: "Boot.dev",
        year: "2026",
        date: "Jun 2026",
        file: "/assets/certificates/learn-aws.png",
      },
      {
        name: "Learn Kubernetes",
        issuer: "Boot.dev",
        year: "2026",
        date: "May 2026",
        file: "/assets/certificates/learn-kubernetes.png",
      },
    ],
  },
  {
    label: "Go",
    items: [
      {
        name: "Learn Go",
        issuer: "Boot.dev",
        year: "2026",
        date: "Jun 2026",
        file: "/assets/certificates/learn-go.png",
      },
    ],
  },
  {
    label: "JavaScript",
    items: [
      {
        name: "Learn JavaScript",
        issuer: "Boot.dev",
        year: "2026",
        date: "Jun 2026",
        file: "/assets/certificates/learn-javascript.png",
      },
    ],
  },
];

module.exports = {
  groups,
  // Flat total across every group — used for the "N certifications" note.
  total: groups.reduce((sum, group) => sum + group.items.length, 0),
};
