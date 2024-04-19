import { IUseCase } from "../../../shared/application/use-case-interface";
import { NotFoundError } from "../../../shared/domain/error/not-found-error";
import { UUID } from "../../../shared/domain/value-object/uuid.value-object";
import { ICategoryRepository } from "../../domain/category-repository";
import {
  CategoryMapperOutput,
  CategoryOutputMapper,
} from "../common/category-output-mapper";

export type UpdateCategoryUseCaseInput = {
  id: string;
  name?: string;
  description?: string;
  isActive?: boolean;
};

export type UpdateCategoryUseCaseOutput = CategoryMapperOutput;

export class UpdateCategoryUseCase
  implements IUseCase<UpdateCategoryUseCaseInput, UpdateCategoryUseCaseOutput>
{
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(
    input: UpdateCategoryUseCaseInput,
  ): Promise<UpdateCategoryUseCaseOutput> {
    const category = await this.categoryRepository.find(new UUID(input.id));
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    if ("name" in input) {
      category.changeName(input.name!);
    }
    if ("description" in input) {
      category.changeDescription(input.description!);
    }
    if ("isActive" in input) {
      input.isActive === true ? category.activate() : category.deactivate();
    }
    await this.categoryRepository.update(category);
    return CategoryOutputMapper.toDTO(category);
  }
}
