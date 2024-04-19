import { Category } from "../domain/category-entity";
import { ICategoryRepository } from "../domain/category-repository";
import { InMemoryCategoryRepository } from "../infra/db/in-memory/in-memory-category-repository";
import { GetCategoryUseCase } from "./get-category-use-case";

describe("GetCategoryUseCase", () => {
  let useCase: GetCategoryUseCase;
  let categoryRepository: ICategoryRepository;

  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    useCase = new GetCategoryUseCase(categoryRepository);
  });

  it("returns a category", async () => {
    const category = Category.create({ name: "Category Name" });
    await categoryRepository.insert(category);
    const result = await useCase.execute(category.id.value);
    expect(result).toEqual({
      id: category.id.value,
      name: category.name,
      description: category.description,
      isActive: category.isActive,
      createdAt: category.createdAt,
    });
  });

  it("throws an error if the category does not exist", async () => {
    await expect(
      useCase.execute("db07e561-2738-4e20-acaa-69a432ddd8b2")
    ).rejects.toThrow("Category not found");
  });
});
