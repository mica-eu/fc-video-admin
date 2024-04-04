import { Entity } from "../../entity";
import { NotFoundError } from "../../error/not-found.error";
import {
  IRepository,
  ISearchableRepository,
  SearchParams,
  SearchResult,
} from "../../repository/repository-interface";
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

export abstract class InMemorySearchableRepository<
    E extends Entity,
    EntityId extends ValueObject
  >
  extends InMemoryRepository<E, EntityId>
  implements ISearchableRepository<E, EntityId>
{
  sortableFields: string[] = [];

  async search(input: SearchParams<string>): Promise<SearchResult<E>> {
    const { page, limit, sortBy, sortOrder, search } = input;
    const items = this.items.filter((item) => {
      const jsonItem = item.toJSON();
      return Object.keys(jsonItem).some((key) => {
        return (jsonItem as { [key: string]: any })[key]
          .toString()
          .includes(search);
      });
    });
    items.sort((a, b) => {
      const jsonA = a.toJSON();
      const jsonB = b.toJSON();
      const valueA = (jsonA as { [key: string]: any })[sortBy];
      const valueB = (jsonB as { [key: string]: any })[sortBy];
      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
    const total = items.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    return Promise.resolve({
      items: items.slice(start, end),
      total,
      page,
    });
  }
}
