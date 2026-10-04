import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/about.html");
});
app.get("/contact-me", (req, res) => {
    res.sendFile(__dirname + "/contact-me.html");
});
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/404.html");
});

const PORT = 8000;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Listening on port ${PORT}...`);
});