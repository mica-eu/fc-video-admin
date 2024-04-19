import { IUseCase } from "../../../shared/application/use-case-interface";
import { NotFoundError } from "../../../shared/domain/error/not-found-error";
import { UUID } from "../../../shared/domain/value-object/uuid.value-object";
import { ICategoryRepository } from "../../domain/category-repository";
import {
  CategoryMapperOutput,
  CategoryOutputMapper,
} from "../common/category-output-mapper";

export type GetCategoryUseCaseOutput = CategoryMapperOutput;

export class GetCategoryUseCase
  implements IUseCase<string, CategoryMapperOutput>
{
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: string): Promise<GetCategoryUseCaseOutput> {
    const category = await this.categoryRepository.find(new UUID(input));
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    return CategoryOutputMapper.toDTO(category);
  }
}
