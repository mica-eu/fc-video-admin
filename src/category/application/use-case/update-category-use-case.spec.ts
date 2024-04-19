import { UUID } from "../../../shared/domain/value-object/uuid.value-object";
import { Category } from "../../domain/category-entity";
import { ICategoryRepository } from "../../domain/category-repository";
import { InMemoryCategoryRepository } from "../../infra/db/in-memory/in-memory-category-repository";
import {
  UpdateCategoryUseCase,
  UpdateCategoryUseCaseInput,
} from "./update-category-use-case";

describe("UpdateCategoryUseCase", () => {
  let categoryRepository: ICategoryRepository;
  let updateCategoryUseCase: UpdateCategoryUseCase;

  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
  });

  it("updates a category", async () => {
    jest.spyOn(InMemoryCategoryRepository.prototype, "find");
    jest.spyOn(InMemoryCategoryRepository.prototype, "update");
    const category = new Category({
      id: new UUID(),
      name: "Category Name",
      description: "Category Description",
      isActive: true,
      createdAt: new Date(),
    });
    await categoryRepository.insert(category);
    const input: UpdateCategoryUseCaseInput = {
      id: category.id.value,
      name: "New Category Name",
      description: "New Category Description",
      isActive: false,
    };
    await updateCategoryUseCase.execute(input);
    expect(categoryRepository.find).toHaveBeenCalledTimes(1);
    expect(categoryRepository.find).toHaveBeenCalledWith(category.id);
    expect(categoryRepository.update).toHaveBeenCalledTimes(1);
    expect(categoryRepository.update).toHaveBeenCalledWith(category);
    expect((await categoryRepository.find(category.id))!.toJSON()).toEqual({
      id: input.id,
      name: input.name,
      description: input.description,
      isActive: input.isActive,
      createdAt: category.createdAt,
    });
  });

  it("updates category name", async () => {
    jest.spyOn(InMemoryCategoryRepository.prototype, "find");
    jest.spyOn(InMemoryCategoryRepository.prototype, "update");
    const category = new Category({
      id: new UUID(),
      name: "Category Name",
      description: "Category Description",
      isActive: true,
      createdAt: new Date(),
    });
    await categoryRepository.insert(category);
    const input: UpdateCategoryUseCaseInput = {
      id: category.id.value,
      name: "New Category Name",
    };
    await updateCategoryUseCase.execute(input);
    expect(categoryRepository.find).toHaveBeenCalledTimes(1);
    expect(categoryRepository.find).toHaveBeenCalledWith(category.id);
    expect(categoryRepository.update).toHaveBeenCalledTimes(1);
    expect(categoryRepository.update).toHaveBeenCalledWith(category);
    expect((await categoryRepository.find(category.id))!.toJSON()).toEqual({
      id: input.id,
      name: input.name,
      description: category.description,
      isActive: category.isActive,
      createdAt: category.createdAt,
    });
  });

  it("updates category description", async () => {
    jest.spyOn(InMemoryCategoryRepository.prototype, "find");
    jest.spyOn(InMemoryCategoryRepository.prototype, "update");
    const category = new Category({
      id: new UUID(),
      name: "Category Name",
      description: "Category Description",
      isActive: true,
      createdAt: new Date(),
    });
    await categoryRepository.insert(category);
    const input: UpdateCategoryUseCaseInput = {
      id: category.id.value,
      description: "New Category Description",
    };
    await updateCategoryUseCase.execute(input);
    expect(categoryRepository.find).toHaveBeenCalledTimes(1);
    expect(categoryRepository.find).toHaveBeenCalledWith(category.id);
    expect(categoryRepository.update).toHaveBeenCalledTimes(1);
    expect(categoryRepository.update).toHaveBeenCalledWith(category);
    expect((await categoryRepository.find(category.id))!.toJSON()).toEqual({
      id: input.id,
      name: category.name,
      description: input.description,
      isActive: category.isActive,
      createdAt: category.createdAt,
    });
  });

  it.each([true, false])(
    "updates category isActive=%s",
    async (isActive: boolean) => {
      jest.spyOn(InMemoryCategoryRepository.prototype, "find");
      jest.spyOn(InMemoryCategoryRepository.prototype, "update");
      const category = new Category({
        id: new UUID(),
        name: "Category Name",
        description: "Category Description",
        isActive: true,
        createdAt: new Date(),
      });
      await categoryRepository.insert(category);
      const input: UpdateCategoryUseCaseInput = {
        id: category.id.value,
        isActive,
      };
      await updateCategoryUseCase.execute(input);
      expect(categoryRepository.find).toHaveBeenCalledTimes(1);
      expect(categoryRepository.find).toHaveBeenCalledWith(category.id);
      expect(categoryRepository.update).toHaveBeenCalledTimes(1);
      expect(categoryRepository.update).toHaveBeenCalledWith(category);
      expect((await categoryRepository.find(category.id))!.toJSON()).toEqual({
        id: input.id,
        name: category.name,
        description: category.description,
        isActive: input.isActive,
        createdAt: category.createdAt,
      });
    },
  );

  it("throws an error if category does not exist", async () => {
    const input: UpdateCategoryUseCaseInput = {
      id: new UUID().value,
      name: "Category Name",
    };
    await expect(updateCategoryUseCase.execute(input)).rejects.toThrow(
      "Category not found",
    );
  });
});
