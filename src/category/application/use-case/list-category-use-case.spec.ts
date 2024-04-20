import { ISearchableRepository } from "../../../shared/domain/repository/repository-interface";
import { UUID } from "../../../shared/domain/value-object/uuid.value-object";
import { Category } from "../../domain/category-entity";
import { InMemoryCategoryRepository } from "../../infra/db/in-memory/in-memory-category-repository";
import { ListCategoryUseCase } from "./list-category-use-case";

describe("ListCategoryUseCase", () => {
  let useCase: ListCategoryUseCase;
  let repository: ISearchableRepository<Category, UUID>;

  beforeEach(() => {
    repository = new InMemoryCategoryRepository();
    useCase = new ListCategoryUseCase(repository);
  });

  it("returns a list of categories", async () => {
    const category1 = Category.create({ name: "Category 1" });
    const category2 = Category.create({ name: "Category 2" });
    await repository.insert(category1);
    await repository.insert(category2);
    const result = await useCase.execute({
      page: 1,
      limit: 10,
      sortBy: "name",
      sortOrder: "asc",
      search: "Category",
    });
    expect(result).toEqual({
      items: [
        {
          id: category1.id.value,
          name: category1.name,
          description: category1.description,
          isActive: category1.isActive,
          createdAt: category1.createdAt,
        },
        {
          id: category2.id.value,
          name: category2.name,
          description: category2.description,
          isActive: category2.isActive,
          createdAt: category2.createdAt,
        },
      ],
      total: 2,
      page: 1,
    });
  });

  it("returns a list of categories with pagination", async () => {
    const category1 = Category.create({ name: "Category 1" });
    const category2 = Category.create({ name: "Category 2" });
    await repository.insert(category1);
    await repository.insert(category2);
    const result = await useCase.execute({
      page: 1,
      limit: 1,
      sortBy: "name",
      sortOrder: "asc",
      search: "Category",
    });
    expect(result).toEqual({
      items: [
        {
          id: category1.id.value,
          name: category1.name,
          description: category1.description,
          isActive: category1.isActive,
          createdAt: category1.createdAt,
        },
      ],
      total: 2,
      page: 1,
    });
  });

  it("returns a list of categories with sorting", async () => {
    const category1 = Category.create({ name: "Category 1" });
    const category2 = Category.create({ name: "Category 2" });
    await repository.insert(category2);
    await repository.insert(category1);
    const result = await useCase.execute({
      page: 1,
      limit: 10,
      sortBy: "name",
      sortOrder: "asc",
      search: "Category",
    });
    expect(result).toEqual({
      items: [
        {
          id: category1.id.value,
          name: category1.name,
          description: category1.description,
          isActive: category1.isActive,
          createdAt: category1.createdAt,
        },
        {
          id: category2.id.value,
          name: category2.name,
          description: category2.description,
          isActive: category2.isActive,
          createdAt: category2.createdAt,
        },
      ],
      total: 2,
      page: 1,
    });
  });

  it("returns a list of categories with search", async () => {
    const category1 = Category.create({ name: "Category 1" });
    const category2 = Category.create({ name: "Category 2" });
    await repository.insert(category1);
    await repository.insert(category2);
    const result = await useCase.execute({
      page: 1,
      limit: 10,
      sortBy: "name",
      sortOrder: "asc",
      search: "Category 1",
    });
    expect(result).toEqual({
      items: [
        {
          id: category1.id.value,
          name: category1.name,
          description: category1.description,
          isActive: category1.isActive,
          createdAt: category1.createdAt,
        },
      ],
      total: 1,
      page: 1,
    });
  });

  it("return a list of categories without search", async () => {
    const category1 = Category.create({ name: "Category 1" });
    const category2 = Category.create({ name: "Category 2" });
    await repository.insert(category1);
    await repository.insert(category2);
    const result = await useCase.execute({
      page: 1,
      limit: 10,
      sortBy: "name",
      sortOrder: "asc",
    });
    expect(result).toEqual({
      items: [
        {
          id: category1.id.value,
          name: category1.name,
          description: category1.description,
          isActive: category1.isActive,
          createdAt: category1.createdAt,
        },
        {
          id: category2.id.value,
          name: category2.name,
          description: category2.description,
          isActive: category2.isActive,
          createdAt: category2.createdAt,
        },
      ],
      total: 2,
      page: 1,
    });
  });
});
