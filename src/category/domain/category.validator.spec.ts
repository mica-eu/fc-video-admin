import { Category } from "./category.entity";
import { CategoryValidator } from "./category.validator";

describe("CategoryValidator", () => {
  it("validates the category name", () => {
    const category = new Category({ name: "Movie" });
    const validator = new CategoryValidator();
    expect(validator.validate(category)).toBe(true);
  });

  it("validates the category name with invalid name", () => {
    const category = new Category({ name: "" });
    const validator = new CategoryValidator();
    validator.validate(category);
    expect(validator.errors).toEqual({ name: ["name should not be empty"] });
  });
});
