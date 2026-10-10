// pages/api/jobs.js
import axios from "axios";

// Job board URLs and search configs
const JOB_SOURCES = {
  linkedin: (keyword) =>
    `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keyword)}&location=`,
  indeed_in: (keyword) =>
    `https://in.indeed.com/jobs?q=${encodeURIComponent(keyword)}`,
  naukri: (keyword) =>
    `https://www.naukri.com/${encodeURIComponent(keyword).toLowerCase()}-jobs`,
  wellfound: (keyword) =>
    `https://wellfound.com/role/${encodeURIComponent(keyword).toLowerCase().replace(/\s+/g, "-")}`,
  fde_pulse: "https://fdepulse.com",
  levels_fyi: (keyword) => `https://www.levels.fyi/jobs?title=${encodeURIComponent(keyword)}`,
};

// Visa-specific job boards by country
const VISA_JOB_BOARDS = {
  germany: [
    "https://www.germantechjobs.de",
    "https://www.arbeitsagentur.de/jobsuche",
    "https://www.make-it-in-germany.com",
  ],
  uk: [
    "https://www.gov.uk/find-a-job",
    "https://www.indeed.co.uk",
    "https://www.totaljobs.com",
  ],
  usa: [
    "https://www.myvisajobs.com",
    "https://www.linkedin.com/jobs",
    "https://www.dice.com",
  ],
  netherlands: [
    "https://relocate.me",
    "https://landing.jobs",
    "https://eures.europa.eu",
  ],
  japan: [
    "https://japan-dev.com",
    "https://www.tokyodev.com",
    "https://en-jobs.daijob.com",
  ],
  singapore: ["https://www.mycareersfuture.gov.sg"],
};

export default async function handler(req, res) {
  const { keyword = "forward deployed engineer", country = null } = req.query;

  try {
    const response = {
      keyword,
      timestamp: new Date().toISOString(),
      sources: {},
    };

    // Generate search links (actual scraping would require headless browser)
    if (country && VISA_JOB_BOARDS[country.toLowerCase()]) {
      response.country = country;
      response.boards = VISA_JOB_BOARDS[country.toLowerCase()];
    } else {
      // Generic FDE/DevOps searches
      Object.entries(JOB_SOURCES).forEach(([source, urlFunc]) => {
        response.sources[source] =
          typeof urlFunc === "function" ? urlFunc(keyword) : urlFunc;
      });
    }

    response.note =
      "These are search links. Real scraping requires authentication or a headless browser. Click through to search directly.";

    return res.status(200).json(response);
  } catch (error) {
    console.error("Jobs API error:", error);
    return res.status(500).json({
      error: "Failed to fetch job data",
      message: error.message,
    });
  }
}
