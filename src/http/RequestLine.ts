export class RequestLine {
  private path: string;
  private queryString: QueryString;
  private method: string;
  private httpVersion: string;

  constructor(requestData: string) {
    const [method, url, httpVersion] = requestData.split(' ');
    const [path, queryString] = url.split('?');

    this.path = path;
    this.queryString = new QueryString(queryString);
    this.method = method;
    this.httpVersion = httpVersion;
  }

  get Path() {
    return this.path;
  }
  get QueryString() {
    return this.queryString;
  }
  get Method() {
    return this.method;
  }
  get HttpVersion() {
    return this.httpVersion;
  }
}

export class QueryString {
  private queryMap = new Map<string, string>();

  constructor(httpQueryData: string) {
    if (!httpQueryData) {
      return;
    }
    if (httpQueryData.includes('?')) {
      httpQueryData = httpQueryData.slice(httpQueryData.indexOf('?') + 1);
    }
    const querySplitData = httpQueryData.split('&');
    for (const query of querySplitData) {
      const [key, value] = query.split('=');
      this.queryMap.set(key, value);
    }
  }

  get keys(): string[] {
    return [...this.queryMap.keys()];
  }
  get values(): string[] {
    return [...this.queryMap.values()];
  }

  getValue(key: string) {
    return this.queryMap.get(key);
  }
}
