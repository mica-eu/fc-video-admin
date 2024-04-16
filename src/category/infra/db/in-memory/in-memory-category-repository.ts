import { InMemorySearchableRepository } from "../../../../shared/domain/db/in-memory/in-memory-repository";
import { UUID } from "../../../../shared/domain/value-object/uuid.value-object";
import { Category } from "../../../domain/category-entity";

export class InMemoryCategoryRepository extends InMemorySearchableRepository<
  Category,
  UUID
> {}
