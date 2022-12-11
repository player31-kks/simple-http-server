import { HttpRequest } from './http/HttpRequest';
import { createServer } from 'net';
import { HttpResponse } from './http/HttpResponse';
import { calculateHandler } from './handler/calculate.handler';
import cluster from 'cluster';
import { cpus } from 'os';
import { v4 as uuidv4 } from 'uuid';

if (cluster.isPrimary) {
  const availableCpus = cpus();
  console.log(`Clustering to ${availableCpus.length} process`);
  availableCpus.forEach(() => cluster.fork());
} else {
  const { pid } = process;
  const server = createServer((socket) => {
    socket.setTimeout(500);
    socket.on('data', (request) => {
      const req = new HttpRequest(request);
      const res = new HttpResponse(socket);
      if (req.isGET && req.matchPath('/calculate')) {
        return calculateHandler(req, res);
      } else {
        return res.send('hello world');
      }
    });
    socket.on('error', (err) => {
      console.log(err);
      console.log('error 발생');
    });
  });

  server.listen(8080, () => {
    console.log(`server open ${pid}`);
  });
}
