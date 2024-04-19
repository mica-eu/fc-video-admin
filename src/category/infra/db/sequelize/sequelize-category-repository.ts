import { Op } from "sequelize";
import {
  ISearchableRepository,
  SearchParams,
  SearchResult,
} from "../../../../shared/domain/repository/repository-interface";
import { UUID } from "../../../../shared/domain/value-object/uuid.value-object";
import { Category } from "../../../domain/category-entity";
import { CategoryModel } from "./category-model";
import { CategoryModelMapper } from "./category-model-mapper";
import { NotFoundError } from "../../../../shared/domain/error/not-found-error";

export class SequelizeCategoryRepository
  implements ISearchableRepository<Category, UUID>
{
  sortableFields: string[] = ["name", "createdAt"];

  constructor(private readonly categoryModel: typeof CategoryModel) {}

  async search(input: SearchParams): Promise<SearchResult<Category>> {
    const { page, limit, sortBy, sortOrder, search } = input;
    const offset = (page - 1) * limit;
    const where = search ? { name: { [Op.like]: `%${search}%` } } : undefined;
    const { rows, count } = await this.categoryModel.findAndCountAll({
      where,
      limit,
      offset,
    });
    return {
      items: rows.map((category) => CategoryModelMapper.toEntity(category)),
      total: count,
      page,
    };
  }

  async insert(entity: Category): Promise<void> {
    this.categoryModel.create(CategoryModelMapper.toModel(entity));
  }

  async update(entity: Category): Promise<void> {
    const category = await this.categoryModel.findByPk(entity.id.value);
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    await category.update({
      name: entity.name,
      description: entity.description,
      isActive: entity.isActive,
    });
  }

  async delete(id: UUID): Promise<void> {
    const category = await this.categoryModel.findByPk(id.value);
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    await category.destroy();
  }

  async find(id: UUID): Promise<Category | null> {
    const category = await this.categoryModel.findByPk(id.value);
    if (!category) {
      return null;
    }
    return CategoryModelMapper.toEntity(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.categoryModel.findAll();
    return categories.map((category) => CategoryModelMapper.toEntity(category));
  }
}
