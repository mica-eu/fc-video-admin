import { Category } from "../../domain/category-entity";
import { ICategoryRepository } from "../../domain/category-repository";
import { InMemoryCategoryRepository } from "../../infra/db/in-memory/in-memory-category-repository";
import { DeleteCategoryUseCase } from "./delete-category-use-case";

describe("DeleteCategoryUseCase", () => {
  let useCase: DeleteCategoryUseCase;
  let categoryRepository: ICategoryRepository;

  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    useCase = new DeleteCategoryUseCase(categoryRepository);
  });

  it("deletes a category", async () => {
    jest.spyOn(categoryRepository, "delete");
    const category = Category.create({ name: "Category Name" });
    await categoryRepository.insert(category);
    await useCase.execute(category.id.value);
    expect(categoryRepository.delete).toHaveBeenCalledWith(category.id);
  });

  it("throws an error if the category does not exist", async () => {
    await expect(
      useCase.execute("db07e561-2738-4e20-acaa-69a432ddd8b2"),
    ).rejects.toThrow("Entity not found");
  });
});
