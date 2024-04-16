import { Sequelize } from "sequelize-typescript";
import { UUID } from "../../../../shared/domain/value-object/uuid.value-object";
import { Category } from "../../../domain/category-entity";
import { CategoryModel } from "./category-model";
import { CategoryModelMapper } from "./category-model-mapper";

describe("CategoryModelMapper", () => {
  beforeEach(async () => {
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      models: [CategoryModel],
      logging: false,
    });
    await sequelize.sync({ force: true });
  });

  it("maps the category entity to model", () => {
    const category = new Category({ name: "Movie" });
    const model = CategoryModelMapper.toModel(category);
    expect(model.name).toBe("Movie");
  });

  it("maps the category model to entity", async () => {
    const model = await CategoryModel.create({
      id: new UUID().value,
      name: "Movie",
      description: "Description",
      isActive: true,
      createdAt: new Date(),
    });
    const category = CategoryModelMapper.toEntity(model);
    expect(category.name).toBe("Movie");
  });
});
