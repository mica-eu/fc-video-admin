import { Category } from "./category.entity";

describe("Category Unit Test", () => {
  it("creates a new category", () => {
    const category = new Category({
      name: "Movie",
    });
    expect(category.id).toBeDefined();
    expect(category.name).toBe("Movie");
    expect(category.description).toBeNull();
    expect(category.isActive).toBe(true);
    expect(category.createdAt).toBeInstanceOf(Date);
  });

  it("creates a new category with create method", () => {
    const category = Category.create({
      name: "Movie",
    });
    expect(category.id).toBeDefined();
    expect(category.name).toBe("Movie");
    expect(category.description).toBeNull();
    expect(category.isActive).toBe(true);
    expect(category.createdAt).toBeInstanceOf(Date);
  });

  it("changes the category name", () => {
    const category = new Category({
      name: "Movie",
    });
    category.changeName("Film");
    expect(category.name).toBe("Film");
  });

  it("changes the category description", () => {
    const category = new Category({
      name: "Movie",
    });
    category.changeDescription("Movies");
    expect(category.description).toBe("Movies");
  });

  it("activates the category", () => {
    const category = new Category({
      name: "Movie",
    });
    category.deactivate();
    category.activate();
    expect(category.isActive).toBe(true);
  });

  it("deactivates the category", () => {
    const category = new Category({
      name: "Movie",
    });
    category.deactivate();
    expect(category.isActive).toBe(false);
  });

  it("converts the category to JSON", () => {
    const category = new Category({
      name: "Movie",
    });
    const json = category.toJSON();
    expect(json).toEqual({
      id: category.id,
      name: "Movie",
      description: null,
      isActive: true,
      createdAt: category.createdAt,
    });
  });
});
