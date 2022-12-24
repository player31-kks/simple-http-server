import { RequestLine } from './RequestLine';
// HTTP Request
// ㄴRequestLine
// ㄴHEADER
// ㄴBODY

export class HttpRequest {
  private requestLine: RequestLine;
  constructor(res: string) {
    const request = res.split('\r\n');
    this.requestLine = new RequestLine(request[0]);
  }

  getQueryString() {
    return this.requestLine.QueryString;
  }

  get isGET() {
    return this.requestLine.Method === 'GET';
  }

  public matchPath(path: string) {
    return this.requestLine.Path === path;
  }
}
