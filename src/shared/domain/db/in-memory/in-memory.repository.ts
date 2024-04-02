import { Entity } from "../../entity";
import { NotFoundError } from "../../error/not-found.error";
import { IRepository } from "../../repository/repository-interface";
import { ValueObject } from "../../value-object/value-object";

export class InMemoryRepository<E extends Entity, EntityId extends ValueObject>
  implements IRepository<E, EntityId>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async update(entity: E): Promise<void> {
    const itemAlreadyExists = this.items.some((item) =>
      item.id.equals(entity.id)
    );
    if (!itemAlreadyExists) {
      throw new NotFoundError("Entity not found");
    }
    this.items.map((item) => (item.id.equals(entity.id) ? entity : item));
  }

  async delete(id: EntityId): Promise<void> {
    const itemAlreadyExists = this.items.some((item) => item.id.equals(id));
    if (!itemAlreadyExists) {
      throw new NotFoundError("Entity not found");
    }
    this.items = this.items.filter((item) => !item.id.equals(id));
  }

  async find(id: EntityId): Promise<E | null> {
    return this.items.find((item) => item.id.equals(id)) || null;
  }

  async list(): Promise<E[]> {
    return this.items;
  }
}
