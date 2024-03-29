import { v4 as uuidv4, validate } from "uuid";
import { ValueObject } from "./value-object";

export class UUID extends ValueObject {
  readonly value: string;

  constructor(value?: string) {
    super();
    this.value = value || uuidv4();
    this.validate();
  }

  private validate() {
    const isValid = validate(this.value);
    if (!isValid) {
      throw new InvalidUUIDError();
    }
  }
}

class InvalidUUIDError extends Error {
  constructor(message?: string) {
    super(message || "Invalid UUID");
    this.name = "InvalidUUIDError";
  }
}
