import { QueryString } from './../http/RequestLine';
import { Calculator, PositiveNum } from '../Calculator';
import { IncomingMessage, ServerResponse } from 'http';

export function calculateHandler(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
  const queryString = new QueryString(req.url ?? '');
  console.log(queryString);
  const operand1 = parseInt(queryString.getValue('operand1') ?? '0', 10);
  const operand2 = parseInt(queryString.getValue('operand2') ?? '0', 10);
  const operator = Calculator.validateOp(queryString.getValue('operator'));

  let content = '';
  if (operator) {
    content = Calculator.calculate(new PositiveNum(operand1), operator, new PositiveNum(operand2)).toString();
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(content);
}
