import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const request = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const openaiEndpoint = "https://api.openai.com/v1/chat/completions";
      const openaiApiKey = "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"; // OpenAI API key

      const response = await axios.post(
        openaiEndpoint,
        {
          messages: [{ role: "user", content: req.body.question }],
          model: "gpt-3.5-turbo",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
        }
      );

      resolve(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error:", error.message);
      reject(error.message);
    }
  });
};

app.post("/chatGpt", (req, res) => {
  request(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(500).json({
        error
      });
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
