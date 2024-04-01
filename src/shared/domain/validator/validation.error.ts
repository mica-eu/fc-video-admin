import { FieldsErrors } from "./validator-fields.interface";

export class EntityValidationError extends Error {
  constructor(public errors: FieldsErrors, message = "Validation error") {
    super(message);
  }

  count(): number {
    return Object.keys(this.errors).length;
  }
}
