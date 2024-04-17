import { UUID } from "../../shared/domain/value-object/uuid.value-object";
import { Category } from "../domain/category-entity";
import { ICategoryRepository } from "../domain/category-repository";
import { InMemoryCategoryRepository } from "../infra/db/in-memory/in-memory-category-repository";
import {
  CreateCategoryUseCase,
  CreateCategoryUseCaseInput,
} from "./create-category-use-case";

describe("CreateCategoryUseCase", () => {
  let categoryRepository: ICategoryRepository;
  let createCategoryUseCase: CreateCategoryUseCase;

  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
  });

  it("creates a category", async () => {
    jest.spyOn(InMemoryCategoryRepository.prototype, "insert");
    const input: CreateCategoryUseCaseInput = {
      name: "Category Name",
      description: "Category Description",
      isActive: true,
    };
    await createCategoryUseCase.execute(input);
    expect(categoryRepository.insert).toHaveBeenCalledTimes(1);
    expect(categoryRepository.insert).toHaveBeenCalledWith(
      expect.any(Category)
    );
    expect(categoryRepository.insert).toHaveBeenCalledWith({
      id: expect.any(UUID),
      name: input.name,
      description: input.description,
      isActive: input.isActive,
      createdAt: expect.any(Date),
    });
  });

  it("creates a category with default values", async () => {
    jest.spyOn(InMemoryCategoryRepository.prototype, "insert");
    const input: CreateCategoryUseCaseInput = {
      name: "Category Name",
    };
    await createCategoryUseCase.execute(input);
    expect(categoryRepository.insert).toHaveBeenCalledWith({
      id: expect.any(UUID),
      name: input.name,
      description: null,
      isActive: true,
      createdAt: expect.any(Date),
    });
  });

  it("returns the created category", async () => {
    const input: CreateCategoryUseCaseInput = {
      name: "Category Name",
      description: "Category Description",
      isActive: true,
    };
    const output = await createCategoryUseCase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      description: input.description,
      isActive: input.isActive,
      createdAt: expect.any(Date),
    });
  });
});
