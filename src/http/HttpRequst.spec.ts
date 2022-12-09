import { HttpRequest } from './HttpRequest';
describe('HttpRequest', () => {
  const template = `GET /calculate?operator=1&operator=2 HTTP/1.1
    User-Agent: PostmanRuntime/7.29.2
    Accept: */*
    Cache-Control: no-cache
    Postman-Token: d6143d67-13f9-4459-a503-6c448a7568e6
    Host: localhost:8080
    Accept-Encoding: gzip, deflate, br
    Connection: keep-alive`;

  it('생성', () => {
    const httpRequest = new HttpRequest(Buffer.from(template));
    expect(httpRequest).toBeInstanceOf(HttpRequest);
  });

  it('isGet', () => {
    const httpRequest = new HttpRequest(Buffer.from(template));
    expect(httpRequest.isGET).toBe(true);
  });

  it('matchPath', () => {
    const httpRequest = new HttpRequest(Buffer.from(template));
    expect(httpRequest.matchPath('/calculate')).toBe(true);
  });
});
