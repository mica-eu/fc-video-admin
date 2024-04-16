import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "./category-model";
import { CategoryModelMapper } from "./category-model-mapper";

describe("CategoryModel", () => {
  beforeAll(async () => {
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      models: [CategoryModel],
    });
    await sequelize.sync({ force: true });
  });

  it("creates a category", async () => {
    const category = await CategoryModel.create({
      id: "69cde876-e1dd-471e-8bb4-bcfe9a719086",
      name: "Category 1",
      description: "Description",
      isActive: true,
      createdAt: new Date(),
    });
    expect(category.id).toBe("69cde876-e1dd-471e-8bb4-bcfe9a719086");
    expect(category.name).toBe("Category 1");
    expect(category.description).toBe("Description");
    expect(category.isActive).toBe(true);
    expect(category.createdAt).toBeInstanceOf(Date);
    expect(CategoryModelMapper.toEntity(category).toJSON()).toEqual({
      createdAt: expect.any(Date),
      description: "Description",
      id: "69cde876-e1dd-471e-8bb4-bcfe9a719086",
      isActive: true,
      name: "Category 1",
    });
  });

  it("updates a category", async () => {
    const category = await CategoryModel.findByPk(
      "69cde876-e1dd-471e-8bb4-bcfe9a719086"
    );
    if (category) {
      category.name = "Category 2";
      await category.save();
    }
    expect(category?.name).toBe("Category 2");
  });

  it("deletes a category", async () => {
    const category = await CategoryModel.findByPk(
      "69cde876-e1dd-471e-8bb4-bcfe9a719086"
    );
    if (category) {
      await category.destroy();
    }
    const deletedCategory = await CategoryModel.findByPk(
      "69cde876-e1dd-471e-8bb4-bcfe9a719086"
    );
    expect(deletedCategory).toBeNull();
  });

  it("finds all categories", async () => {
    const categories = await CategoryModel.findAll();
    expect(categories).toHaveLength(0);
  });
});
