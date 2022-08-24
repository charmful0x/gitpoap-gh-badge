import { getPoapsRes } from "./utils/processPoaps.js";
import express from "express";
import cors  from "cors";

const app = express();
const port = process.env.PORT || 3000;


app.use(express.static('public'))

app.use(cors({
    origin: "*"
}));
app.set("view engine", "ejs");

app.get("/badges/:username", async (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  const response = await getPoapsRes(req.params.username);
  res.send(response);
});

app.listen(port, async () => {
  console.log(`listening at PORT:${port}`);
});
