// pages/api/search.js (HuggingFace version)
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query, topic } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query required" });
  }

  try {
    const huggingFaceToken = process.env.HUGGINGFACE_API_KEY;

    if (!huggingFaceToken) {
      return res.status(400).json({
        error: "HuggingFace API key not configured",
        hint: "Add HUGGINGFACE_API_KEY to .env.local",
      });
    }

    // Use HuggingFace Inference API with a free model
    // Using meta-llama/Llama-2-7b-chat (free, good quality)
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat",
      {
        inputs: `Today is ${new Date().toDateString()}. You are a research analyst for an Indian DevOps engineer planning career and relocation.

Topic: ${topic || query}

Provide the most recent developments you know of (as of today), as short bullets (max 200 words), with what changed and what it means. End with a line naming official sources to verify. Plain text only, no markdown.`,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.7,
          top_p: 0.95,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${huggingFaceToken}`,
          "Content-Type": "application/json",
        },
        timeout: 60000, // 60 second timeout
      }
    );

    // HuggingFace returns an array of results
    let output = "";
    if (Array.isArray(response.data) && response.data.length > 0) {
      output = response.data[0].generated_text || "";
    } else if (response.data.generated_text) {
      output = response.data.generated_text;
    } else {
      output = JSON.stringify(response.data);
    }

    // Clean up the output (remove the prompt from the response)
    output = output.replace(/Topic:.*?Plain text only.*?\./, "").trim();

    if (!output) {
      return res.status(500).json({
        error: "Empty response from HuggingFace",
        note: "Model may be loading. Try again in a moment.",
      });
    }

    return res.status(200).json({
      success: true,
      data: output,
      timestamp: new Date().toISOString(),
      source: "HuggingFace Llama-2-7b-chat (free tier)",
    });
  } catch (error) {
    console.error("HuggingFace API error:", error.message);

    // Handle specific HuggingFace errors
    if (error.response?.status === 429) {
      return res.status(429).json({
        error: "Rate limited",
        message: "HuggingFace free tier has usage limits. Try again in a moment.",
      });
    }

    if (error.response?.status === 401) {
      return res.status(401).json({
        error: "Invalid API key",
        message: "Check your HUGGINGFACE_API_KEY in .env.local",
      });
    }

    if (error.message.includes("timeout")) {
      return res.status(504).json({
        error: "Request timeout",
        message: "Model is busy. HuggingFace free tier can be slow. Try again.",
      });
    }

    return res.status(500).json({
      error: "Failed to fetch data from HuggingFace",
      message: error.message,
      hint: "Free HuggingFace models may have delays. Try again in 30 seconds.",
    });
  }
}
