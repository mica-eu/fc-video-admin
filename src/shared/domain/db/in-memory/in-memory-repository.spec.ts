import { Entity } from "../../entity";
import { UUID } from "../../value-object/uuid.value-object";
import { InMemoryRepository } from "./in-memory-repository";

class StubEntity extends Entity {
  #id: UUID;

  constructor(
    id: UUID = new UUID(),
    public name: string,
    public price: number
  ) {
    super();
    this.#id = id;
  }

  get id(): UUID {
    return this.#id;
  }

  toJSON() {
    return {
      id: this.#id.value,
      name: this.name,
      price: this.price,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, UUID> {
  constructor() {
    super();
  }
}

describe("InMemoryRepository", () => {
  let repo: StubInMemoryRepository;

  beforeEach(() => {
    repo = new StubInMemoryRepository();
  });

  it("inserts an entity", async () => {
    const entity = new StubEntity(new UUID(), "Entity 1", 10);
    await repo.insert(entity);
    const result = await repo.find(entity.id);
    expect(result?.toJSON()).toEqual(entity.toJSON());
  });

  it("updates an entity", async () => {
    const entity = new StubEntity(new UUID(), "Entity 1", 10);
    await repo.insert(entity);
    entity.name = "Entity 2";
    await repo.update(entity);
    const result = await repo.find(entity.id);
    expect(result?.toJSON()).toEqual(entity.toJSON());
  });

  it("deletes an entity", async () => {
    const entity = new StubEntity(new UUID(), "Entity 1", 10);
    await repo.insert(entity);
    await repo.delete(entity.id);
    const result = await repo.find(entity.id);
    expect(result).toEqual(null);
  });

  it("finds an entity", async () => {
    const entity = new StubEntity(new UUID(), "Entity 1", 10);
    await repo.insert(entity);
    const result = await repo.find(entity.id);
    expect(result?.toJSON()).toEqual(entity.toJSON());
  });

  it("list all entities", async () => {
    const entity1 = new StubEntity(new UUID(), "Entity 1", 10);
    const entity2 = new StubEntity(new UUID(), "Entity 2", 20);
    await repo.insert(entity1);
    await repo.insert(entity2);
    const result = await repo.list();
    expect(result).toEqual([entity1, entity2]);
  });

  it("returns null when entity is not found", async () => {
    const result = await repo.find(new UUID());
    expect(result).toEqual(null);
  });

  it("throws an error when updating a non-existing entity", async () => {
    const entity = new StubEntity(new UUID(), "Entity 1", 10);
    await expect(repo.update(entity)).rejects.toThrow("Entity not found");
  });

  it("throws an error when deleting a non-existing entity", async () => {
    const entity = new StubEntity(new UUID(), "Entity 1", 10);
    await expect(repo.delete(entity.id)).rejects.toThrow("Entity not found");
  });

  it("returns an empty list when there are no entities", async () => {
    const result = await repo.list();
    expect(result).toEqual([]);
  });
});
