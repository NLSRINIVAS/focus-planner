// pages/index.js
import React, { useState, useEffect } from "react";
import styles from "../styles/index.module.css";

export default function Home() {
  const tabs = [
    { id: "fi", label: "1 · Finance" },
    { id: "role", label: "2 · Role" },
    { id: "fde", label: "FDE / Agentic" },
    { id: "geo", label: "3 · India vs Abroad" },
    { id: "jobs", label: "Jobs & Visa" },
    { id: "skill", label: "4 · Skills" },
    { id: "rec", label: "Verdict" },
  ];

  const [activeTab, setActiveTab] = useState("fi");
  const [loading, setLoading] = useState({});
  const [responses, setResponses] = useState({});

  // Finance calculator
  const [finance, setFinance] = useState({
    inc: 150000,
    e: 60000,
    emi: 25000,
    lb: 1500000,
    lr: 9,
    lm: 84,
    sv: 400000,
    sr: 6.5,
    st: 800000,
    rt: 11,
    sip: 30000,
    i: 6,
    w: 3.3,
  });

  const [fiResult, setFiResult] = useState(null);

  const handleFinanceChange = (e) => {
    const { name, value } = e.target;
    setFinance({ ...finance, [name]: parseFloat(value) || 0 });
  };

  const calculateFI = () => {
    const g = (id) => finance[id] || 0;
    const inc = g("inc"),
      e = g("e"),
      emi = g("emi"),
      lb = g("lb"),
      lr = (g("lr") / 100) || 0.09,
      lm = g("lm"),
      sv = g("sv"),
      sr = (g("sr") / 100) || 0.065,
      st = g("st"),
      rr = (g("rt") / 100) || 0.11,
      sip = g("sip"),
      i = (g("i") / 100) || 0.06,
      w = (g("w") / 100) || 0.033;

    const ms = Math.pow(1 + sr, 1 / 12) - 1;
    const mt = Math.pow(1 + rr, 1 / 12) - 1;
    const ml = Math.pow(1 + lr, 1 / 12) - 1;

    const sur = inc - e - emi;
    const rest = Math.max(0, sur - sip);
    const tgt = (e * 12) / (w || 0.033);

    let S = sv,
      P = st,
      B = lb,
      m = 0;
    while (S + P - B < tgt && m < 1200) {
      const a = m < lm && B > 0;
      S = S * (1 + ms) + rest + (a ? 0 : emi);
      P = P * (1 + mt) + sip;
      B = a ? Math.max(0, B * (1 + ml) - emi) : 0;
      m++;
    }

    const nw = sv + st - lb;
    const cov = Math.max(0, nw) / tgt;
    const sRate = inc ? (sur / inc) * 100 : 0;
    const emiR = inc ? (emi / inc) * 100 : 0;
    const ef = sv / ((e + emi) || 1);

    setFiResult({
      netWorth: nw,
      fiNumber: tgt,
      coverage: (cov * 100).toFixed(1),
      yearsToFI: m >= 1200 ? "100+" : (m / 12).toFixed(1),
      surplus: sur,
      savingsRate: sRate.toFixed(0),
      emiPercent: emiR.toFixed(0),
      emergencyFund: ef.toFixed(1),
      stockShare: ((st / ((sv + st) || 1)) * 100).toFixed(0),
    });
  };

  const fetchData = async (topic) => {
    setLoading({ ...loading, [topic]: true });
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: topic,
          topic: topic,
        }),
      });
      const data = await res.json();
      setResponses({
        ...responses,
        [topic]: data.data || data.error,
      });
    } catch (error) {
      setResponses({
        ...responses,
        [topic]: `Error: ${error.message}`,
      });
    } finally {
      setLoading({ ...loading, [topic]: false });
    }
  };

  const fetchJobs = async (keyword = "forward deployed engineer") => {
    setLoading({ ...loading, jobs: true });
    try {
      const res = await fetch(`/api/jobs?keyword=${encodeURIComponent(keyword)}`);
      const data = await res.json();
      setResponses({
        ...responses,
        jobs: JSON.stringify(data, null, 2),
      });
    } catch (error) {
      setResponses({ ...responses, jobs: `Error: ${error.message}` });
    } finally {
      setLoading({ ...loading, jobs: false });
    }
  };

  const fetchVisaRules = async (country = null) => {
    setLoading({ ...loading, visa: true });
    try {
      const url = country ? `/api/visa-tracker?country=${country}` : "/api/visa-tracker";
      const res = await fetch(url);
      const data = await res.json();
      setResponses({
        ...responses,
        visa: JSON.stringify(data, null, 2),
      });
    } catch (error) {
      setResponses({ ...responses, visa: `Error: ${error.message}` });
    } finally {
      setLoading({ ...loading, visa: false });
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>🧭 Focus Planner</h1>
        <p>Finance · Role · FDE/Agentic · Career abroad · Skills</p>
      </header>

      <nav className={styles.nav}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.navBtn} ${activeTab === tab.id ? styles.active : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className={styles.main}>
        {activeTab === "fi" && (
          <section className={styles.section}>
            <h2>1. Financial Independence Calculator</h2>
            <div className={styles.grid}>
              <div>
                <label>Monthly income (take-home)</label>
                <input
                  type="number"
                  name="inc"
                  value={finance.inc}
                  onChange={handleFinanceChange}
                />
              </div>
              <div>
                <label>Monthly expenses</label>
                <input
                  type="number"
                  name="e"
                  value={finance.e}
                  onChange={handleFinanceChange}
                />
              </div>
              <div>
                <label>Monthly EMI</label>
                <input
                  type="number"
                  name="emi"
                  value={finance.emi}
                  onChange={handleFinanceChange}
                />
              </div>
              <div>
                <label>Outstanding loan balance</label>
                <input
                  type="number"
                  name="lb"
                  value={finance.lb}
                  onChange={handleFinanceChange}
                />
              </div>
              <div>
                <label>Savings (bank/FD)</label>
                <input
                  type="number"
                  name="sv"
                  value={finance.sv}
                  onChange={handleFinanceChange}
                />
              </div>
              <div>
                <label>Stock/MF value</label>
                <input
                  type="number"
                  name="st"
                  value={finance.st}
                  onChange={handleFinanceChange}
                />
              </div>
              <div>
                <label>Monthly SIP</label>
                <input
                  type="number"
                  name="sip"
                  value={finance.sip}
                  onChange={handleFinanceChange}
                />
              </div>
              <div>
                <label>Stock return % /yr</label>
                <input
                  type="number"
                  name="rt"
                  value={finance.rt}
                  onChange={handleFinanceChange}
                />
              </div>
            </div>
            <button className={styles.btn} onClick={calculateFI}>
              Calculate FI
            </button>
            {fiResult && (
              <div className={styles.result}>
                <h3>Your Financial Status</h3>
                <table className={styles.table}>
                  <tbody>
                    <tr>
                      <td>Net worth</td>
                      <td className={fiResult.netWorth >= 0 ? styles.ok : styles.bd}>
                        ₹{fiResult.netWorth.toLocaleString("en-IN")}
                      </td>
                    </tr>
                    <tr>
                      <td>FI number (goal)</td>
                      <td>₹{Math.round(fiResult.fiNumber).toLocaleString("en-IN")}</td>
                    </tr>
                    <tr>
                      <td>FI coverage</td>
                      <td className={fiResult.coverage >= 75 ? styles.ok : styles.wn}>
                        {fiResult.coverage}%
                      </td>
                    </tr>
                    <tr>
                      <td>Years to FI</td>
                      <td>{fiResult.yearsToFI}</td>
                    </tr>
                    <tr>
                      <td>Monthly surplus</td>
                      <td>₹{fiResult.surplus.toLocaleString("en-IN")}</td>
                    </tr>
                    <tr>
                      <td>Savings rate</td>
                      <td>{fiResult.savingsRate}%</td>
                    </tr>
                    <tr>
                      <td>Emergency fund</td>
                      <td>{fiResult.emergencyFund} months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {activeTab === "fde" && (
          <section className={styles.section}>
            <h2>FDE / Agentic DevOps Roles</h2>
            <p>
              Forward Deployed Engineers embed with customers. Agentic DevOps builds and runs AI
              systems at scale.
            </p>
            <button
              className={styles.btn}
              onClick={() => fetchData("FDE demand, salaries, and skills in 2026")}
              disabled={loading.fde}
            >
              {loading.fde ? "Fetching..." : "Get latest FDE market data"}
            </button>
            {responses.fde && <pre className={styles.response}>{responses.fde}</pre>}
          </section>
        )}

        {activeTab === "geo" && (
          <section className={styles.section}>
            <h2>3. India vs Abroad: Geo & Visa Analysis</h2>
            <button
              className={styles.btn}
              onClick={() =>
                fetchData("Latest economic outlook, immigration policy, and visa rules for India and abroad")
              }
              disabled={loading.geo}
            >
              {loading.geo ? "Fetching..." : "Get geopolitical brief"}
            </button>
            {responses.geo && <pre className={styles.response}>{responses.geo}</pre>}
          </section>
        )}

        {activeTab === "jobs" && (
          <section className={styles.section}>
            <h2>Live Job Listings & Visa Rules</h2>
            <div className={styles.grid}>
              <button className={styles.btn} onClick={() => fetchJobs("forward deployed engineer")}>
                Search FDE jobs
              </button>
              <button className={styles.btn} onClick={() => fetchVisaRules()}>
                Fetch all visa rules
              </button>
              <button className={styles.btn} onClick={() => fetchVisaRules("germany")}>
                Germany Blue Card
              </button>
              <button className={styles.btn} onClick={() => fetchVisaRules("usa")}>
                USA H-1B
              </button>
            </div>
            {responses.jobs && (
              <div className={styles.result}>
                <h3>Job Search Results</h3>
                <pre className={styles.response}>{responses.jobs}</pre>
              </div>
            )}
            {responses.visa && (
              <div className={styles.result}>
                <h3>Visa Rules</h3>
                <pre className={styles.response}>{responses.visa}</pre>
              </div>
            )}
          </section>
        )}

        {activeTab === "role" && (
          <section className={styles.section}>
            <h2>2. Current Role & Market Position</h2>
            <button
              className={styles.btn}
              onClick={() =>
                fetchData("DevOps and SRE job market demand in India and globally in 2026")
              }
              disabled={loading.role}
            >
              {loading.role ? "Fetching..." : "Get role market data"}
            </button>
            {responses.role && <pre className={styles.response}>{responses.role}</pre>}
          </section>
        )}

        {activeTab === "skill" && (
          <section className={styles.section}>
            <h2>4. Skills Development</h2>
            <button
              className={styles.btn}
              onClick={() =>
                fetchData("Timelines and resources for native English, Japanese JLPT, German B1+")
              }
              disabled={loading.skill}
            >
              {loading.skill ? "Fetching..." : "Get skill roadmaps"}
            </button>
            {responses.skill && <pre className={styles.response}>{responses.skill}</pre>}
          </section>
        )}

        {activeTab === "rec" && (
          <section className={styles.section}>
            <h2>Your Personalised Recommendation</h2>
            <ol>
              <li>
                <b>Stay employed, upskill for 6–12 months.</b> Move toward AI-platform /
                agentic DevOps first, then FDE once your coding and customer skills are proven.
              </li>
              <li>
                <b>Target Germany Blue Card (€45,934 IT threshold)</b> as your primary route. L-1
                intra-company transfer for USA is secondary. Japan, Netherlands and Ireland as
                backups.
              </li>
              <li>
                <b>Build public proof:</b> 3 projects on GitHub (agent with guardrails, K8s IaC,
                observability for AI).
              </li>
              <li>
                <b>Language priority:</b> English fluency now, German (B1) for Germany in 6 months,
                or Japanese (N3) for Japan in 12–18 months.
              </li>
              <li>
                <b>FI check:</b> Your financial runway is your negotiating power. Target 18+ months
                of expenses saved before a big move.
              </li>
            </ol>
          </section>
        )}
      </main>

      <footer className={styles.footer}>
        <p>
          📌 Data refreshes weekly. Always verify on official government sites for immigration
          rules.
        </p>
        <p>
          Hosted on GitLab | Built with Next.js | Powered by Claude API | Last updated Oct 10,
          2026
        </p>
      </footer>
    </div>
  );
}
