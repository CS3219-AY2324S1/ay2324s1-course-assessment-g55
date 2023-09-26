import { Server, Socket } from 'socket.io';
import { MatchmakingLogic } from '../matchmaking/matchmaking-logic'; // Import your matchmaking logic

export function initializeSocketHandlers(io: Server) {
  const matchmakingLogic = new MatchmakingLogic(); // Create an instance of your matchmaking logic

  io.on('connection', (socket: Socket) => {
    console.log(`User connected with socket ID: ${socket.id}`);

    // Handle user disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected with socket ID: ${socket.id}`);
      // Implement any necessary cleanup or disconnection logic
    });

    // Handle matchmaking requests
    socket.on('joinMatchmaking', (data: { userId: string, difficulty: string }) => {
      const { userId, difficulty } = data;

      // Implement matchmaking logic
      matchmakingLogic.joinMatchmaking(userId, difficulty)
        .then((match) => {
          if (match) {
            // Notify the user that a match has been found
            socket.emit('matchFound', match);
          } else {
            // Notify the user that they are in the matchmaking queue
            socket.emit('waitingForMatch');
          }
        })
        .catch((error) => {
          // Handle errors and notify the user
          socket.emit('matchmakingError', { message: error.message });
        });
    });

    // Handle other WebSocket events as needed
    // ...

    // Example of sending a message to the client
    // socket.emit('message', 'Hello, client!');
  });
}
