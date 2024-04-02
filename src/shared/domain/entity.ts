export abstract class Entity {
  abstract get id(): string;
  abstract toJSON(): any;
}
