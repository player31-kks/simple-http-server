import { createServer } from 'net';

const server = createServer((socket) => {
  socket.on('data', (data) => {
    console.log(data.toString());
    const content = 'hello world';
    socket.write(Buffer.from(`HTTP/1.1 200 OK\r\n`));
    socket.write(Buffer.from(`Content-Type: text/plain\r\n`));
    socket.write(Buffer.from(`Content-Length: ${content.length}\r\n`));
    socket.write(Buffer.from(`\r\n`));
    socket.write(content);
    socket.write(Buffer.from(`\r\n`));
    socket.end();
  });
});

server.listen(8080, () => {
  console.log('server open');
});
