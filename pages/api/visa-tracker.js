// pages/api/visa-tracker.js

const VISA_RULES = {
  usa: {
    h1b: {
      name: "H-1B",
      status: "Active (FY 2027 lottery effective Feb 27, 2026)",
      salary_weighted: true,
      fees: {
        registration: "$215",
        supplemental: "$100,000 for new petitions from outside US",
        note: "Change of status filings inside US exempt from $100k fee",
      },
      wage_levels: {
        level_4: "4 entries in lottery",
        level_3: "3 entries in lottery",
        level_2: "2 entries in lottery",
        level_1: "1 entry in lottery",
      },
      registration_window: "Mar 4 - Mar 19, 2026",
      best_for: "Senior engineers, high salary",
      alternative:
        "L-1 intra-company transfer, O-1 with strong public work, E-2 treaty",
      sources: [
        "https://www.uscis.gov",
        "https://flag.dol.gov",
        "https://www.myvisajobs.com",
      ],
    },
  },
  germany: {
    blue_card: {
      name: "EU Blue Card",
      status: "Active (2026 thresholds effective Jan 1, 2026)",
      standard_salary: "€50,700 gross/year (~€4,225/month)",
      shortage_salary: "€45,934.20/year (IT, STEM, healthcare)",
      it_specialist_requirement:
        "3+ years experience OR recent degree, no degree required",
      pr_timeline: "21-27 months depending on German language level (B1 vs A1)",
      family_reunification: "Allowed from day 1",
      sources: [
        "https://www.make-it-in-germany.com",
        "https://www.bmi.bund.de",
      ],
    },
    opportunity_card: {
      name: "Chancenkarte (Opportunity Card)",
      status: "Active - job seeker route",
      purpose: "Find employment in Germany, then convert to Blue Card",
      duration: "12 months",
      sources: ["https://www.make-it-in-germany.com"],
    },
  },
  uk: {
    skilled_worker: {
      name: "Skilled Worker Visa",
      status: "Active (B2 English requirement since Jan 8, 2026)",
      salary_threshold: "Depends on role; ~£30,000 base",
      english_requirement: "B2 (IELTS 6.5 or equivalent)",
      settlement: "10 years baseline (proposed, some in force as of Apr 2026)",
      employer_costs: "£5,000-9,000 per application",
      sources: ["https://www.gov.uk/skilled-worker-visa"],
    },
    graduate_visa: {
      name: "Graduate Visa",
      status: "18 months (from Jan 1, 2027)",
      duration: "18 months (reduced from 2 years)",
      phd_exception: "3 years for PhD graduates",
      sources: ["https://www.gov.uk/student-visa"],
    },
  },
  japan: {
    highly_skilled_professional: {
      name: "Highly Skilled Professional (HSP) / Points-based",
      status: "Active",
      benefits: "PR in 1-3 years depending on points",
      base_salary_indicator: "About ¥3 million+ annually helps",
      language_requirement: "Not required for work, but needed for daily life",
      sources: ["https://www.moj.go.jp/isa/", "https://japan-dev.com"],
    },
    work_visa: {
      name: "Engineering/Tech work visa",
      status: "Active",
      requirement: "Job offer + degree or relevant experience",
      sources: ["https://www.moj.go.jp/isa/"],
    },
  },
  netherlands: {
    highly_skilled_migrant: {
      name: "Highly Skilled Migrant Visa",
      status: "Active",
      salary_threshold: "€4,000-5,000+/month depending on age",
      employer_sponsorship: "Required",
      path_to_pr: "5 years continuous residence + integration agreement",
      sources: ["https://ind.nl"],
    },
  },
  canada: {
    express_entry: {
      name: "Express Entry",
      status: "Active (but capped)",
      note: "Study-permit and PR targets reduced 2024-2025; verify current",
      best_for: "Senior/mid-level engineers with Canadian education or points",
      sources: ["https://www.canada.ca/en/immigration-refugees-citizenship"],
    },
  },
  australia: {
    skilled_migration: {
      name: "Skilled Migration / Visa 189/190",
      status: "Active (capped, competitive)",
      note: "Points-based; master's degree helps but not guaranteed",
      sources: ["https://immi.homeaffairs.gov.au"],
    },
  },
};

const LAST_UPDATED = "Oct 10, 2026";

export default function handler(req, res) {
  const { country = null } = req.query;

  try {
    if (country && VISA_RULES[country.toLowerCase()]) {
      return res.status(200).json({
        country: country.toLowerCase(),
        rules: VISA_RULES[country.toLowerCase()],
        last_updated: LAST_UPDATED,
        disclaimer:
          "For official, binding information, always check government immigration sites.",
      });
    }

    return res.status(200).json({
      all_rules: VISA_RULES,
      last_updated: LAST_UPDATED,
      disclaimer:
        "For official, binding information, always check government immigration sites.",
      available_countries: Object.keys(VISA_RULES),
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch visa rules",
      message: error.message,
    });
  }
}
