import { Request, Response } from 'express';

class MatchmakingController {
  // Simulated matchmaking queue (in-memory array)
  private matchmakingQueue: string[] = [];

  // Simulated matches (in-memory array)
  private matches: { matchId: string; users: string[] }[] = [];

  // Add a user to the matchmaking queue
  addToQueue(req: Request, res: Response): void {
    const userId: string = req.body.userId;

    if (!userId) {
      res.status(400).json({ message: 'User ID is required.' });
      return;
    }

    this.matchmakingQueue.push(userId);
    res.status(200).json({ message: 'User added to the matchmaking queue.' });
  }

  // Create matches from users in the matchmaking queue
  createMatch(req: Request, res: Response): void {
    if (this.matchmakingQueue.length < 2) {
      res.status(400).json({ message: 'Insufficient users in the queue to create a match.' });
      return;
    }

    // Take the first two users from the queue to create a match
    const users = this.matchmakingQueue.splice(0, 2);
    const matchId = `match_${Date.now()}`;

    this.matches.push({ matchId, users });
    res.status(201).json({ message: 'Match created.', matchId });
  }

  // Get matches for a specific user
  getMatchesForUser(req: Request, res: Response, userId: string): void {
    const userMatches = this.matches.filter((match) => match.users.includes(userId));
    res.status(200).json({ matches: userMatches });
  }

  // Delete a match by its ID
  deleteMatch(req: Request, res: Response, matchId: string): void {
    const matchIndex = this.matches.findIndex((match) => match.matchId === matchId);

    if (matchIndex === -1) {
      res.status(404).json({ message: 'Match not found.' });
      return;
    }

    this.matches.splice(matchIndex, 1);
    res.status(200).json({ message: 'Match deleted.' });
  }
}

export { MatchmakingController };
