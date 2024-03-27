import { ValueObject } from "./value-object";

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(readonly foo: string, readonly bar: number) {
    super();
  }
}

describe("ValueObject Unit Test", () => {
  it("returns true when two value objects are equal", () => {
    const simple1 = new StringValueObject("test");
    const simple2 = new StringValueObject("test");
    expect(simple1.equals(simple2)).toBe(true);
    const complex1 = new ComplexValueObject("foo", 1);
    const complex2 = new ComplexValueObject("foo", 1);
    expect(complex1.equals(complex2)).toBe(true);
  });

  it("returns false when two value objects are different", () => {
    const simple1 = new StringValueObject("test");
    const simple2 = new StringValueObject("test2");
    expect(simple1.equals(simple2)).toBe(false);
    const complex1 = new ComplexValueObject("foo", 1);
    const complex2 = new ComplexValueObject("foo", 2);
    expect(complex1.equals(complex2)).toBe(false);
  });
});
