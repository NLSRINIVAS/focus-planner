// pages/api/search.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "HuggingFace API key not configured" });
  }

  try {
    console.log("🔄 Calling HuggingFace Serverless API...");

    const response = await fetch(
      "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_length: 500,
            temperature: 0.7,
            top_p: 0.9,
          },
        }),
      }
    );

    console.log("📊 Response status:", response.status);

    if (response.status === 429) {
      return res.status(429).json({
        error: "Rate limited by HuggingFace. Please try again in a few seconds.",
      });
    }

    if (response.status === 401) {
      return res.status(401).json({
        error: "Invalid HuggingFace API key",
      });
    }

    if (response.status === 503) {
      return res.status(503).json({
        error: "HuggingFace model is loading. Please try again in 30 seconds.",
      });
    }

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ HuggingFace error:", data);
      return res.status(response.status).json({
        error: data.error || "HuggingFace API error",
      });
    }

    // Extract text from response
    let responseText = "";
    if (Array.isArray(data)) {
      responseText = data[0]?.generated_text || "";
    } else if (data.generated_text) {
      responseText = data.generated_text;
    } else {
      responseText = JSON.stringify(data);
    }

    console.log("✅ Success:", responseText.substring(0, 100) + "...");

    res.status(200).json({
      response: responseText,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ API Error:", error.message);

    // Network error handling
    if (error.code === "ENOTFOUND" || error.message.includes("getaddrinfo")) {
      return res.status(503).json({
        error: "Network error: Cannot reach HuggingFace. This might be a temporary connectivity issue. Please try again.",
      });
    }

    if (error.message.includes("timeout")) {
      return res.status(504).json({
        error: "Request timeout. HuggingFace took too long to respond. Please try again.",
      });
    }

    res.status(500).json({
      error: error.message || "Unknown error occurred",
    });
  }
}
