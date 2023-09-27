import express from 'express';
import { MatchmakingController } from '../controllers/matchmaking-controller'; // Import your matchmaking controller here

const router = express.Router();
const matchmakingController = new MatchmakingController(); // Create an instance of the matchmaking controller

// Define routes for matchmaking
router.post('/queue', (req, res) => {
  // Handle matchmaking queue request
  matchmakingController.addToQueue(req, res);
});

router.post('/matches', (req, res) => {
  // Handle creating matches
  matchmakingController.createMatch(req, res);
});

export default router;
