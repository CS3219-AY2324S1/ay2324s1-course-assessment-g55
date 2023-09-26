import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/matchmaking'; // Import your matchmaking routes here

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for your API
app.use(bodyParser.json()); // Parse JSON requests

// Routes
app.use('/api/matchmaking', routes); // Mount your matchmaking routes

// Error handler middleware (You can create your own error-handler.ts)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
