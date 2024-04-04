import { ValueObject } from "./value-object/value-object";

export abstract class Entity {
  abstract get id(): ValueObject;
  abstract toJSON(): object;
}
