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

  // Create matches from users in the matchmaking queue
  createMatch(req: Request, res: Response): void {
    // Matchmaking logic using RabbitMQ should be handled asynchronously through message consumption
    // Instead of creating a match directly here, you'll listen for match messages from RabbitMQ

    res.status(202).json({ message: 'Match creation request accepted.' });
  }

  // Initialize RabbitMQ when the server starts
  initializeRabbitMQ(): void {
    RabbitMQService.initialize()
      .then(() => {
        // Add RabbitMQ initialization success handling if needed
      })
      .catch((error) => {
        console.error('Error initializing RabbitMQ:', error.message);
      });
  }
}

export { MatchmakingController };
