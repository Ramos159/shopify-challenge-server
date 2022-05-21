// import fetch from "node-fetch";
import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import cors from "cors";
const app = express()
const port = process.env.PORT || 3000
config();
 
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("build"));
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post("/getResponse", (req, res) => {
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
        res.status(200).json(responseData);
    });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});