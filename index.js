import fetch from "node-fetch";
import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import cors from "cors";
var app = express()
const port = 3000;
config();

app.use(bodyParser.json()); 
app.use(express.static("build"));

app.use(cors())

app.options("/getResponse", cors());
app.post("/getResponse", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers","Content-Type");
    // res.header("Content-Type","application/json");
    res.header("Access-Control-Allow-Methods","GET,POST,OPTIONS,DELETE,PUT")

    const promptString = req.body.prompt;

    const data = {
        prompt: promptString,
        temperature: 1.0,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    };

    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_SECRET}`,
        },
        body: JSON.stringify(data),
    }).then((response)=>response.json())
    .then((responseData)=>{
        res.set("Content-Type", "text/html");
        res.send(JSON.stringify(responseData.choices[0].text));
    });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});