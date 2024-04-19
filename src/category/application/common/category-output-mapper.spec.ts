import { Category } from "../../domain/category-entity";
import { CategoryOutputMapper } from "./category-output-mapper";

describe("CategoryOutputMapper", () => {
  it("returns CategoryMapperOutpu", () => {
    const category = Category.create({
      name: "Category Name",
      description: "Category Description",
      isActive: true,
      createdAt: new Date("2021-06-06T00:00:00.000Z"),
    });
    const result = CategoryOutputMapper.toDTO(category);
    expect(result).toEqual({
      id: category.id.value,
      name: "Category Name",
      description: "Category Description",
      isActive: true,
      createdAt: new Date("2021-06-06T00:00:00.000Z"),
    });
  });
});
