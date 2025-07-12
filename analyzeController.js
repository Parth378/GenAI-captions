// const analyzePrompt = async (req, res) => {
//   const { input } = req.body;

//   // For now, use mock data (replace later with OpenAI)
//   const result = {
//     description: `Here’s a creative caption for "${input}".`,
//     hashtags: ['#social', '#media', '#ai', '#caption']
//   };

//   res.json(result);
// };

// module.exports = { analyzePrompt };


// const axios = require("axios");

// const analyzePrompt = async (req, res) => {
//   const { input } = req.body;

//   if (!input || input.trim() === "") {
//     return res.status(400).json({ error: "Input is required" });
//   }

//   try {
//     const response = await axios.post(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         model: "mixtral-8x7b-32768", // Or use: llama3-70b-8192
//         messages: [
//           {
//             role: "user",
//             content: `Create a beautiful, poetic one-line caption for social media about: "${input}". Also provide 5 trendy hashtags. Format it as:\nCaption: <caption>\nHashtags: #tag1 #tag2 ...`
//           }
//         ],
//         max_tokens: 100,
//         temperature: 0.8
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     const aiText = response.data.choices[0].message.content;

//     const captionMatch = aiText.match(/Caption:\s*(.+)/i);
//     const hashtagsMatch = aiText.match(/Hashtags:\s*(.+)/i);

//     const description = captionMatch ? captionMatch[1].trim().replace(/^"|"$/g, "") : "No caption found.";
//     const hashtags = hashtagsMatch
//       ? hashtagsMatch[1].trim().split(/\s+/).filter(tag => tag.startsWith("#"))
//       : [];

//     res.json({ description, hashtags });

//   } catch (error) {
//     console.error("Groq API Error:", error.response?.data || error.message);
//     res.status(500).json({ error: "Groq API Error", message: error.message });
//   }
// };

// module.exports = { analyzePrompt };


// controllers/analyzeController.js
const axios = require("axios");

const analyzePrompt = async (req, res) => {
  const { input } = req.body;

  if (!input || input.trim() === "") {
    return res.status(400).json({ error: "Input is required" });
  }

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        // **Updated Model:** Using llama3-8b-8192 as a current example.
        // Always refer to https://console.groq.com/docs/deprecations for the latest supported models.
        model: "llama3-8b-8192",
        messages: [
          {
            role: "user",
            content: `Create a beautiful, poetic one-line caption for social media about: "${input}". Also provide 5 trendy hashtags. Format it as:\nCaption: <caption>\nHashtags: #tag1 #tag2 ...`
          }
        ],
        max_tokens: 100,
        temperature: 0.8
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiText = response.data.choices[0].message.content;

    const captionMatch = aiText.match(/Caption:\s*(.+)/i);
    const hashtagsMatch = aiText.match(/Hashtags:\s*(.+)/i);

    const description = captionMatch ? captionMatch[1].trim().replace(/^"|"$/g, "") : "No caption found.";
    const hashtags = hashtagsMatch
      ? hashtagsMatch[1].trim().split(/\s+/).filter(tag => tag.startsWith("#"))
      : [];

    res.json({ description, hashtags });

  } catch (error) {
    console.error("Groq API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Groq API Error", message: error.message });
  }
};

module.exports = { analyzePrompt };