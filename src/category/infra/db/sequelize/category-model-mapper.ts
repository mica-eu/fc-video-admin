import { UUID } from "../../../../shared/domain/value-object/uuid.value-object";
import { Category } from "../../../domain/category-entity";
import { CategoryModel, CategoryModelAttributes } from "./category-model";

export class CategoryModelMapper {
  static toEntity(categoryModel: CategoryModel): Category {
    return Category.create({
      id: new UUID(categoryModel.id),
      name: categoryModel.name,
      description: categoryModel.description,
      isActive: categoryModel.isActive,
      createdAt: categoryModel.createdAt,
    });
  }

  static toModel(category: Category): CategoryModelAttributes {
    return {
      id: category.id.value,
      name: category.name,
      description: category.description,
      isActive: category.isActive,
      createdAt: category.createdAt,
    };
  }
}
