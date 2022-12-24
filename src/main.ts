import { createWebServer } from './http/createWebServer';

const webServer = createWebServer(() => {});
webServer.listen(8080, () => {
  console.log('server open');
});
