import { RequestLine, QueryString } from './RequestLine';

describe('RequestLine', () => {
  it('생성', () => {
    const url = new RequestLine('GET /calculate?operator=1&operator=2 HTTP/1.1');
    expect(url).toBeInstanceOf(RequestLine);
  });

  it('get path', () => {
    const url = new RequestLine('GET /calculate?operator=1&operator=2 HTTP/1.1');
    expect(url.Path).toEqual('/calculate');
  });

  it('get path', () => {
    const url = new RequestLine('GET /calculate?operator=1&operator=2 HTTP/1.1');
    expect(url.QueryString).toBeInstanceOf(QueryString);
  });
  it('get method', () => {
    const url = new RequestLine('GET /calculate?operator=1&operator=2 HTTP/1.1');
    expect(url.Method).toEqual('GET');
  });
  it('get httpVersion', () => {
    const url = new RequestLine('GET /calculate?operator=1&operator=2 HTTP/1.1');
    expect(url.HttpVersion).toEqual('HTTP/1.1');
  });

  describe('QueryString', () => {
    it('get keys', () => {
      const queryString = new QueryString('operand1=1&operator=*&operand2=2');
      expect(queryString.keys).toEqual(['operand1', 'operator', 'operand2']);
    });
    it('get values', () => {
      const queryString = new QueryString('operand1=1&operator=*&operand2=2');
      expect(queryString.values).toEqual(['1', '*', '2']);
    });
    it('get getValueByKey operand1', () => {
      const queryString = new QueryString('operand1=1&operator=*&operand2=2');
      expect(queryString.getValue('operand1')).toEqual('1');
    });
  });
});
