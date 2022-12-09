export type Op = '+' | '-' | '*' | '/';

abstract class Operator {
  constructor(public op: Op) {}
  abstract calculate(operand1: PositiveNum, operand2: PositiveNum): number;
}

class Add extends Operator {
  calculate(operand1: PositiveNum, operand2: PositiveNum) {
    return operand1.value + operand2.value;
  }
}
class Minus extends Operator {
  calculate(operand1: PositiveNum, operand2: PositiveNum) {
    return operand1.value - operand2.value;
  }
}
class Multiply extends Operator {
  calculate(operand1: PositiveNum, operand2: PositiveNum) {
    return operand1.value * operand2.value;
  }
}
class Divide extends Operator {
  calculate(operand1: PositiveNum, operand2: PositiveNum) {
    return operand1.value / operand2.value;
  }
}

export class PositiveNum {
  public value: number;
  constructor(value: number) {
    this.validation(value);
    this.value = value;
  }

  private validation(value: number) {
    if (value <= 0) {
      throw new Error('양수가 아님');
    }
  }
}

export class Calculator {
  private static operator: Operator[] = [new Add('+'), new Minus('-'), new Multiply('*'), new Divide('/')];

  public static calculate(operand1: PositiveNum, op: Op, operand2: PositiveNum): number {
    const result = this.operator
      .filter((each) => each.op === op)
      .map((each) => each.calculate(operand1, operand2))
      .at(0);

    if (!result) {
      throw new Error('계산오류');
    }
    return result;
  }

  public static validateOp(op: string | undefined): Op | undefined {
    if (!op) {
      return undefined;
    }
    if (['+', '-', '*', '/'].includes(op)) {
      return op as Op;
    }
  }
}
