/**
 * Experience timeline — real roles distilled from docs/profile/profile.md.
 * Ordered most-recent-first to thread down the left-hairline timeline.
 *
 * Fields:
 *   when    — date range shown in the small uppercase label
 *   role    — job title
 *   org     — organization (kept readable; long names abbreviated)
 *   meta    — work mode / location detail
 *   summary — one-to-two sentence framing
 *   points  — optional short list of concrete highlights
 *   kind    — "work" (default) or "education"; drives nothing but intent/reading
 */
module.exports = [
  {
    when: "Feb 2024 — Mar 2026",
    role: "Backend Developer",
    org: "DOST-ASTI",
    meta: "On-site · Advanced Science and Technology Institute",
    summary:
      "Backend developer on the institute's platforms, improving reliability and test coverage as the containerized stack migrated from an on-premise server to AWS.",
    points: [
      "Initiated unit testing, taking code coverage from 0 to ~90%, and optimized database queries through in-depth root-cause analysis.",
      "Managed Dockerized services — first on an on-premise Ubuntu server, then on AWS after migration, orchestrating containers there with Elastic Kubernetes Service (EKS).",
      "Built an automated pipeline for building the inference-service, AI-training, and dataset-validation containers: source in S3, builds in CodeBuild, images in ECR.",
      "Automated infrastructure provisioning for the core service with AWS CloudFormation, enabling fast, repeatable deployments.",
      "Integrated AWS data services — RDS (core database), ElastiCache/Redis (caching), and Amazon MQ (message broker) — and ran smoke and load tests with Grafana K6.",
    ],
  },
  {
    when: "Aug — Sep 2022",
    role: "Web Developer (Intern)",
    org: "Dashlabs.ai",
    meta: "Remote",
    summary:
      "Contributed to the platform's Patient Management Service and supported customers across email and chat.",
  },
  {
    when: "2019 — 2023",
    role: "B.S. Computer Science",
    org: "Polytechnic University of the Philippines",
    meta: "DOST-SEI Scholar · S&T Scholarship Act (RA 7687)",
    kind: "education",
    summary:
      "Studied on a competitive DOST-SEI undergraduate scholarship under the Science & Technology Scholarship Act of 1994, awarded to top-performing students in priority STEM fields.",
  },
];
