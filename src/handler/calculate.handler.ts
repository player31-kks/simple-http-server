import { HttpResponse } from './../http/HttpResponse';
import { HttpRequest } from './../http/HttpRequest';
import { Calculator, PositiveNum } from '../Calculator';

export function calculateHandler(req: HttpRequest, res: HttpResponse) {
  const queryString = req.getQueryString();
  const operand1 = parseInt(queryString.getValue('operand1') ?? '0', 10);
  const operand2 = parseInt(queryString.getValue('operand2') ?? '0', 10);
  const operator = Calculator.validateOp(queryString.getValue('operator'));

  let content = '';
  if (operator) {
    content = Calculator.calculate(new PositiveNum(operand1), operator, new PositiveNum(operand2)).toString();
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.send(content);
}
