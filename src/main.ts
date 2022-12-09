import { HttpRequest } from './http/HttpRequest';
import { createServer } from 'net';
import { Calculator, PositiveNum } from './Calculator';

const server = createServer((socket) => {
  socket.on('data', (request) => {
    const httpRequest = new HttpRequest(request);
    let content = '';
    if (httpRequest.isGET && httpRequest.matchPath('/calculate')) {
      const queryString = httpRequest.getQueryString();
      const operand1 = parseInt(queryString.getValue('operand1') ?? '0', 10);
      const operand2 = parseInt(queryString.getValue('operand2') ?? '0', 10);
      const operator = Calculator.validateOp(queryString.getValue('operator'));
      if (operator) {
        content = Calculator.calculate(new PositiveNum(operand1), operator, new PositiveNum(operand2)).toString();
      }
    }
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
