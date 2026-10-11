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
    console.log("🔄 Calling HuggingFace Inference API...");
    console.log("📝 Prompt:", prompt.substring(0, 50) + "...");

    // HuggingFace Inference API endpoint
    const endpoint =
      "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat";

    // Simple request body - just inputs, no parameters
    const requestPayload = {
      inputs: prompt,
    };

    console.log("📤 Sending request to:", endpoint);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });

    console.log("📊 Response status:", response.status);
    console.log("📋 Response headers:", Object.fromEntries(response.headers));

    const data = await response.json();
    console.log("📦 Response data:", JSON.stringify(data).substring(0, 200));

    // Handle different error responses
    if (response.status === 400) {
      console.error("❌ 400 Bad Request:", data);
      // This often means the model is loading
      if (data.error && data.error.includes("loading")) {
        return res.status(503).json({
          error: "HuggingFace model is loading. Please wait 30 seconds and try again.",
        });
      }
      return res.status(400).json({
        error: data.error || "Bad request to HuggingFace",
      });
    }

    if (response.status === 429) {
      console.warn("⚠️ Rate limited");
      return res.status(429).json({
        error: "Rate limited. Please wait a moment and try again.",
      });
    }

    if (response.status === 401) {
      console.error("❌ Unauthorized - invalid API key");
      return res.status(401).json({
        error: "Invalid HuggingFace API key",
      });
    }

    if (response.status === 503) {
      console.warn("⚠️ Service unavailable");
      return res.status(503).json({
        error: "HuggingFace service is temporarily unavailable. Please try again.",
      });
    }

    if (!response.ok) {
      console.error("❌ Unexpected error:", response.status, data);
      return res.status(response.status).json({
        error: data.error || `HuggingFace error: ${response.status}`,
      });
    }

    // Parse response
    let responseText = "";

    if (Array.isArray(data)) {
      // Response is array of objects
      responseText = data[0]?.generated_text || data[0] || "";
    } else if (typeof data === "string") {
      responseText = data;
    } else if (data.generated_text) {
      responseText = data.generated_text;
    } else {
      responseText = JSON.stringify(data);
    }

    // Clean up the response if it includes the prompt
    if (responseText.includes(prompt)) {
      responseText = responseText.replace(prompt, "").trim();
    }

    if (!responseText) {
      return res.status(500).json({
        error: "Empty response from HuggingFace",
      });
    }

    console.log("✅ Success! Response length:", responseText.length);

    res.status(200).json({
      response: responseText,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Catch Error:", error.message);
    console.error("Error type:", error.constructor.name);
    console.error("Full error:", error);

    // Network error handling
    if (
      error.code === "ENOTFOUND" ||
      error.message.includes("getaddrinfo") ||
      error.message.includes("ENOTFOUND")
    ) {
      return res.status(503).json({
        error: "Network error: Cannot reach HuggingFace. Check your internet connection.",
      });
    }

    if (error.message.includes("timeout")) {
      return res.status(504).json({
        error: "Request timeout. Please try again.",
      });
    }

    res.status(500).json({
      error: error.message || "Unknown error occurred",
    });
  }
}
