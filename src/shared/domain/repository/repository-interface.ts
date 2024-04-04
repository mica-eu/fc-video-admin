import { Entity } from "../entity";
import { ValueObject } from "../value-object/value-object";

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
  insert(entity: E): Promise<void>;
  update(entity: E): Promise<void>;
  delete(id: EntityId): Promise<void>;
  find(id: EntityId): Promise<E | null>;
  list(): Promise<E[]>;
}

export interface SearchParams<FilterType = string> {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  search?: FilterType;
}

export interface SearchResult<E extends Entity> {
  items: E[];
  total: number;
  page: number;
}

export interface ISearchableRepository<
  E extends Entity,
  EntityId extends ValueObject
> extends IRepository<E, EntityId> {
  sortableFields: string[];

  search(input: SearchParams): Promise<SearchResult<E>>;
}
