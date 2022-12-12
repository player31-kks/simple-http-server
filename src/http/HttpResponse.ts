import { Writable } from 'stream';

export class HttpResponse {
  private code: number = 200;
  private header: string = 'Content-Type: text/plain';

  constructor(private res: Writable) {}

  send(body: any) {
    setTimeout(() => {
      this.res.write(Buffer.from(`HTTP/1.1 ${this.code} OK\r\n`));
      this.res.write(Buffer.from(this.header));
      this.res.write(Buffer.from(`Content-Length: ${body.length}\r\n`));
      this.res.write(Buffer.from(`\r\n`));
      this.res.write(body);
      this.res.write(Buffer.from(`\r\n`));
      this.res.end();
    }, 100);
  }

  writeHead(code: number, option?: Record<string, string>) {
    this.code = code;
    if (option) {
      this.header = Object.keys(option)
        .map((key) => {
          return `${key}: ${option[key]}\r\n`;
        })
        .reduce((acc, cur) => acc + cur);
    }
  }
}
