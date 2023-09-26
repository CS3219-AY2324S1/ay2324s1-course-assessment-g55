class MatchmakingLogic {
    private matchmakingQueues: Record<string, string[]> = {
      easy: [],
      medium: [],
      hard: [],
    };
  
    // Function to add a player to the matchmaking queue
    joinMatchmaking(userId: string, difficulty: string): Promise<any> {
      return new Promise((resolve, reject) => {
        if (!this.matchmakingQueues[difficulty]) {
          return reject(new Error('Invalid difficulty level.'));
        }
  
        this.matchmakingQueues[difficulty].push(userId);
  
        if (this.matchmakingQueues[difficulty].length >= 2) {
          // If enough players are available, create a match
          const players = this.matchmakingQueues[difficulty].splice(0, 2);
          const match = {
            matchId: `match_${Date.now()}`,
            players,
            difficulty,
          };
  
          resolve(match);
        } else {
          // Not enough players in the queue, notify the user to wait
          resolve(null);
        }
      });
    }
  
    // Function to remove a player from the matchmaking queue
    leaveMatchmaking(userId: string, difficulty: string): void {
      if (!this.matchmakingQueues[difficulty]) {
        return;
      }
  
      const index = this.matchmakingQueues[difficulty].indexOf(userId);
  
      if (index !== -1) {
        this.matchmakingQueues[difficulty].splice(index, 1);
      }
    }
  
    // Function to retrieve the current matchmaking queues
    getMatchmakingQueues(): Record<string, string[]> {
      return this.matchmakingQueues;
    }
  }
  
  export { MatchmakingLogic };
  