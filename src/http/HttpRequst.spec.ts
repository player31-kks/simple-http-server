import { HttpRequest } from './HttpRequest';
describe('HttpRequest', () => {
  const template = `GET /calculate?operator=1&operator=2 HTTP/1.1\r
    User-Agent: PostmanRuntime/7.29.2\r
    Accept: */*\r
    Cache-Control: no-cache\r
    Postman-Token: d6143d67-13f9-4459-a503-6c448a7568e6\r
    Host: localhost:8080\r
    Accept-Encoding: gzip, deflate, br\r
    Connection: keep-alive\r\n`;

  it('생성', () => {
    const httpRequest = new HttpRequest(template);
    expect(httpRequest).toBeInstanceOf(HttpRequest);
  });

  it('isGet', () => {
    const httpRequest = new HttpRequest(template);
    expect(httpRequest.isGET).toBe(true);
  });

  it('matchPath', () => {
    const httpRequest = new HttpRequest(template);
    expect(httpRequest.matchPath('/calculate')).toBe(true);
  });
});
