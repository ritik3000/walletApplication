import express from "express"
import router from "./routes/pageRoutes";
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1",router);

// health check
app.get('/health', (_req, res) => res.json({ ok: true }));

app.listen(3000);