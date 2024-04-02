import { Entity } from "../entity";
import { ValueObject } from "../value-object/value-object";

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
  insert(entity: E): Promise<void>;
  update(entity: E): Promise<void>;
  delete(id: EntityId): Promise<void>;
  find(id: EntityId): Promise<E | null>;
  list(): Promise<E[]>;
}
