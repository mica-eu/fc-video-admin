import { IUseCase } from "../../shared/application/use-case-interface";
import { Category } from "../domain/category-entity";
import { ICategoryRepository } from "../domain/category-repository";

export interface CreateCategoryUseCaseInput {
  name: string;
  description?: string | null;
  isActive?: boolean;
}

export interface CreateCategoryUseCaseOutput {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
}

export class CreateCategoryUseCase
  implements IUseCase<CreateCategoryUseCaseInput, CreateCategoryUseCaseOutput>
{
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(
    input: CreateCategoryUseCaseInput
  ): Promise<CreateCategoryUseCaseOutput> {
    const category = Category.create(input);
    await this.categoryRepository.insert(category);
    return {
      id: category.id.value,
      name: category.name,
      description: category.description,
      isActive: category.isActive,
      createdAt: category.createdAt,
    };
  }
}
