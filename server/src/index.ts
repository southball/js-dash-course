import * as express from "express";

const app: express.Express = express();

app.use(express.json());
app.use("/files",express.static("./files"))

app.post("/", (req, res) => {
    res.status(404);
    res.end(JSON.stringify(req.body));
});

app.listen(3000);