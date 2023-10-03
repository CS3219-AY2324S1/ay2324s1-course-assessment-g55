import { Request, Response } from 'express';
import RabbitMQService from '../../message-queue/rabbitmq'; // Import the RabbitMQ service

class MatchmakingController {
  // Add a user to the matchmaking queue
  addToQueue(req: Request, res: Response): void {
    const userId: string = req.body.userId;

    if (!userId) {
      res.status(400).json({ message: 'User ID is required.' });
      return;
    }

    const difficulty: string = req.body.difficulty || 'easy'; // Default to 'easy' if difficulty is not provided

    // Publish a message to the corresponding RabbitMQ queue
    RabbitMQService.publishMessage(difficulty, JSON.stringify({ userId }));

    res.status(200).json({ message: 'User added to the matchmaking queue.' });
  }

  // Remove a user from the matchmaking queue
  removeFromQueue(req: Request, res: Response): void {
    const userId: string = req.body.userId;

    if (!userId) {
      res.status(400).json({ message: 'User ID is required.' });
      return;
    }

    const difficulty: string = req.body.difficulty || 'easy'; // Default to 'easy' if difficulty is not provided

    // // Publish a message to the corresponding RabbitMQ queue to remove the user
    // RabbitMQService.publishMessage(
    //   `remove_${difficulty}`,
    //   JSON.stringify({ userId })
    // );

    res
      .status(200)
      .json({ message: 'User removed from the matchmaking queue.' });
  }
}

export { MatchmakingController };
