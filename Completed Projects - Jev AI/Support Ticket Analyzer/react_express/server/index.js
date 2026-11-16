import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import analyzeRouter from './routes/analyze.js';


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/analyze', analyzeRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
