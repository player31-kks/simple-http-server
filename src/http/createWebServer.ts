import { createServer, Socket } from 'net';
import { HttpRequest } from './HttpRequest';

export function createWebServer(requestHandler: Function) {
  const server = createServer();
  server.on('connection', (socket) => {
    socket.once('readable', () => {
      const reqHeader = readReqHeader(socket);
      if (reqHeader) {
        const header = new HttpRequest(reqHeader);
      }
      socket.end('hello world');
    });
  });

  return {
    listen(port: number, cb?: Function) {
      server.listen(port);
      cb && cb();
    },
  };
}

function readReqHeader(socket: Socket) {
  let reqBuffer = Buffer.from('');
  let reqHeader = '';
  while (true) {
    const chunk = socket.read();
    if (!chunk) break;
    reqBuffer = Buffer.concat([reqBuffer, chunk]);
    const matchIndex = reqBuffer.indexOf('\r\n\r\n');
    if (matchIndex !== -1) {
      const remainingBuffer = reqBuffer.slice(matchIndex + 4);
      reqHeader = reqBuffer.slice(0, matchIndex).toString();
      socket.unshift(remainingBuffer);
      break;
    }
  }
  return reqHeader;
}
