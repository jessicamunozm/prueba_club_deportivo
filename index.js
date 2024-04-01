import express from 'express';
import routes from './routes/routes.js';
const app = express();
const PORT = process.env.PORT || 3001;

app.use('/', routes)

app.listen (PORT, () => console.log (`servidor lenvantado en puerto http://localhost:${PORT}`))