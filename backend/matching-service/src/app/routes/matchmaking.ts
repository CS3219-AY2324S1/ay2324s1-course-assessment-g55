import express from 'express';
import { MatchmakingController } from '../controllers/matchmaking-controller'; // Import your matchmaking controller here

const router = express.Router();
const matchmakingController = new MatchmakingController(); // Create an instance of the matchmaking controller

// Define routes for matchmaking
router.get('/queue', (req, res) => {
  // Handle matchmaking queue request
  matchmakingController.addToQueue(req, res);
});

router.get('/matches/:playerId', (req, res) => {
  // Handle retrieving matches for a player
  const playerId = req.params.playerId;
  matchmakingController.getMatchesForUser(req, res, playerId);
});

router.post('/matches', (req, res) => {
  // Handle creating matches
  matchmakingController.createMatch(req, res);
});

router.delete('/matches/:matchId', (req, res) => {
  // Handle deleting a match
  const matchId = req.params.matchId;
  matchmakingController.deleteMatch(req, res, matchId);
});

export default router;
