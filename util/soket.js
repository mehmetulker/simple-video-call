import { createServer } from 'http';
import { App } from 'next/app';

const httpServer = createServer();
const io = require('socket.io')(httpServer);

// Next.js App'a ekstra alan eklemek için genişletme
declare module 'next/app' {
  interface AppInitialProps {
    socketServer?: any;
  }
}

export { io, httpServer };