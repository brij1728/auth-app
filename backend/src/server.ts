import { connectDB, prisma } from './db';

import app from './app';
import { validateEnv } from './utils';

validateEnv();

const PORT = process.env.PORT || 3001;

console.log('Starting server...!!');

(async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });

    const handleShutdown = async (signal: string) => {
      console.log(`Received ${signal}. Closing server...`);
      server.close(async () => {
        console.log('Server closed.');
        await prisma.$disconnect();
        console.log('Database connection closed.');
        process.exit(0);
      });
    };

    // Handling different shutdown scenarios
    process.on('SIGINT', handleShutdown);
    process.on('SIGTERM', handleShutdown);
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
})();
