import cluster from 'cluster';
import { cpus } from 'os';
import { createServer } from 'http';
import { calculateHandler } from './handler/calculate.handler';

if (cluster.isPrimary) {
  const availableCpus = cpus();
  console.log(`Clustering to ${availableCpus.length} process`);
  availableCpus.forEach(() => cluster.fork());
} else {
  const { pid } = process;
  const server = createServer((req, res) => {
    if (req.method === 'GET' && req.url?.includes('/calculate')) {
      return calculateHandler(req, res);
    }
    return res.end('hello world');
  });

  server.listen(8080, () => {
    console.log(`server open ${pid}`);
  });
}
