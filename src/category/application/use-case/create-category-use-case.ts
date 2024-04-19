import { IUseCase } from "../../../shared/application/use-case-interface";
import { Category } from "../../domain/category-entity";
import { ICategoryRepository } from "../../domain/category-repository";
import {
  CategoryMapperOutput,
  CategoryOutputMapper,
} from "../common/category-output-mapper";

export type CreateCategoryUseCaseInput = {
  name: string;
  description?: string | null;
  isActive?: boolean;
};

export type CreateCategoryUseCaseOutput = CategoryMapperOutput;

export class CreateCategoryUseCase
  implements IUseCase<CreateCategoryUseCaseInput, CategoryMapperOutput>
{
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(
    input: CreateCategoryUseCaseInput,
  ): Promise<CreateCategoryUseCaseOutput> {
    const category = Category.create(input);
    await this.categoryRepository.insert(category);
    return CategoryOutputMapper.toDTO(category);
  }
}
