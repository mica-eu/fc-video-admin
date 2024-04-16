import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "./category-model";
import { SequelizeCategoryRepository } from "./sequelize-category-repository";
import { Category } from "../../../domain/category-entity";
import { UUID } from "../../../../shared/domain/value-object/uuid.value-object";
import { CategoryModelMapper } from "./category-model-mapper";

describe("SequelizeCategoryRepository", () => {
  beforeEach(async () => {
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      models: [CategoryModel],
      logging: false,
    });
    await sequelize.sync({ force: true });
  });

  it("creates a new category", async () => {
    const categoryRepository = new SequelizeCategoryRepository(CategoryModel);
    const category = Category.create({
      name: "Category 1",
      description: "Description 1",
    });
    await categoryRepository.insert(category);
    const result = await CategoryModel.findOne();
    expect(result?.name).toBe("Category 1");
    expect(result?.description).toBe("Description 1");
  });

  it("updates a category", async () => {
    const categoryRepository = new SequelizeCategoryRepository(CategoryModel);
    const category = Category.create({
      id: new UUID(),
      name: "Category 1",
      description: "Description 1",
    });
    await categoryRepository.insert(category);
    category.changeName("Category 2");
    category.changeDescription("Description 2");
    await categoryRepository.update(category);
    const result = await CategoryModel.findByPk(category.id.value);
    expect(result?.name).toBe("Category 2");
    expect(result?.description).toBe("Description 2");
  });

  it("throws an error when updating a category that does not exist", async () => {
    const categoryRepository = new SequelizeCategoryRepository(CategoryModel);
    const category = Category.create({
      id: new UUID(),
      name: "Category 1",
      description: "Description 1",
    });
    await expect(categoryRepository.update(category)).rejects.toThrowError(
      "Category not found"
    );
  });

  it("deletes a category", async () => {
    const categoryRepository = new SequelizeCategoryRepository(CategoryModel);
    const category = Category.create({
      id: new UUID(),
      name: "Category 1",
      description: "Description 1",
    });
    await categoryRepository.insert(category);
    expect((await categoryRepository.find(category.id))?.id.value).toEqual(
      category.id.value
    );
    await categoryRepository.delete(category.id);
    expect(await categoryRepository.find(category.id)).toBeNull();
  });

  it("throws an error when deleting a category that does not exist", async () => {
    const categoryRepository = new SequelizeCategoryRepository(CategoryModel);
    const category = Category.create({
      id: new UUID(),
      name: "Category 1",
      description: "Description 1",
    });
    await expect(categoryRepository.delete(category.id)).rejects.toThrowError(
      "Category not found"
    );
  });

  it("finds a category", async () => {
    const categoryRepository = new SequelizeCategoryRepository(CategoryModel);
    const category = Category.create({
      id: new UUID(),
      name: "Category 1",
      description: "Description 1",
    });
    await categoryRepository.insert(category);
    const result = await categoryRepository.find(category.id);
    expect(category.toJSON()).toEqual(result?.toJSON());
  });

  it("returns null when finding a category that does not exist", async () => {
    const categoryRepository = new SequelizeCategoryRepository(CategoryModel);
    const category = await categoryRepository.find(new UUID());
    expect(category).toBeNull();
  });

  it("lists all categories", async () => {
    const categoryRepository = new SequelizeCategoryRepository(CategoryModel);
    const category1 = Category.create({
      id: new UUID(),
      name: "Category 1",
      description: "Description 1",
    });
    const category2 = Category.create({
      id: new UUID(),
      name: "Category 2",
      description: "Description 2",
    });
    await categoryRepository.insert(category1);
    await categoryRepository.insert(category2);
    const result = await categoryRepository.list();
    expect(result).toHaveLength(2);
    expect(result).toEqual([category1, category2]);
  });

  it("returns an empty array when there are no categories", async () => {
    const categoryRepository = new SequelizeCategoryRepository(CategoryModel);
    const categories = await categoryRepository.list();
    expect(categories).toHaveLength(0);
  });

  it("searchs a category by name", async () => {
    const categoryRepository = new SequelizeCategoryRepository(CategoryModel);
    const category1 = Category.create({
      id: new UUID(),
      name: "Category 1",
      description: "Description 1",
    });
    const category2 = Category.create({
      id: new UUID(),
      name: "Category 2",
      description: "Description 2",
    });
    await categoryRepository.insert(category1);
    await categoryRepository.insert(category2);
    const result = await categoryRepository.search({
      search: "Category 1",
      limit: 10,
      page: 1,
      sortBy: "name",
      sortOrder: "asc",
    });
    expect(result.items).toHaveLength(1);
    expect(result.items).toEqual([category1]);
  });

  it("returns an empty array when there are no categories with the search term", async () => {
    const categoryRepository = new SequelizeCategoryRepository(CategoryModel);
    const category1 = Category.create({
      id: new UUID(),
      name: "Category 1",
      description: "Description 1",
    });
    const category2 = Category.create({
      id: new UUID(),
      name: "Category 2",
      description: "Description 2",
    });
    await categoryRepository.insert(category1);
    await categoryRepository.insert(category2);
    const result = await categoryRepository.search({
      search: "Category 3",
      limit: 10,
      page: 1,
      sortBy: "name",
      sortOrder: "asc",
    });
    expect(result.items).toHaveLength(0);
  });
});
