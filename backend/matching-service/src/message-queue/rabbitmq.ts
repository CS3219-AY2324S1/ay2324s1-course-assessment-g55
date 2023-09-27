import * as amqp from 'amqplib';

require('dotenv').config(); // Load environment variables from .env

const rabbitmqUrl = process.env.RABBITMQ_URL;

class RabbitMQService {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  async initialize() {
    try {
      // Connect to RabbitMQ server
      if (rabbitmqUrl===undefined) {
          throw new Error(  'RABBITMQ_URL is not defined in the .env file.')
        }
        this.connection = await amqp.connect(rabbitmqUrl);
      // Create a channel
      this.channel = await this.connection.createChannel();

      // Declare the exchange and queues
      await this.channel.assertExchange('matchmaking', 'direct', { durable: true });
      await this.channel.assertQueue('easy', { durable: true });
      await this.channel.assertQueue('medium', { durable: true });
      await this.channel.assertQueue('hard', { durable: true });

      // Bind queues to the exchange with routing keys
      await this.channel.bindQueue('easy', 'matchmaking', 'easy');
      await this.channel.bindQueue('medium', 'matchmaking', 'medium');
      await this.channel.bindQueue('hard', 'matchmaking', 'hard');

      console.log('RabbitMQ initialized successfully');
    } catch (error:any) {
      console.error('Error initializing RabbitMQ:', error.message);
    }
  }

  async publishMessage(queue: string, message: string) {
    if (!this.channel) {
      console.error('RabbitMQ channel not initialized');
      return;
    }

    try {
      await this.channel.sendToQueue(queue, Buffer.from(message));
      console.log(`Message sent to queue "${queue}": ${message}`);
    } catch (error:any) {
      console.error(`Error sending message to queue "${queue}":`, error.message);
    }
  }

  async consumeQueue(queue: string, callback: (message: amqp.Message | null) => void) {
    if (!this.channel) {
      console.error('RabbitMQ channel not initialized');
      return;
    }

    try {
      await this.channel.consume(queue, (message) => {
        callback(message);
      });
    } catch (error:any) {
      console.error(`Error consuming queue "${queue}":`, error.message);
    }
  }
}

export default new RabbitMQService();
