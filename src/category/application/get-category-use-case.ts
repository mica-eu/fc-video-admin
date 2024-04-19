import { IUseCase } from "../../shared/application/use-case-interface";
import { NotFoundError } from "../../shared/domain/error/not-found-error";
import { UUID } from "../../shared/domain/value-object/uuid.value-object";
import { ICategoryRepository } from "../domain/category-repository";

export type GetCategoryUseCaseOutput = {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
};

export class GetCategoryUseCase
  implements IUseCase<string, GetCategoryUseCaseOutput>
{
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: string): Promise<GetCategoryUseCaseOutput> {
    const category = await this.categoryRepository.find(new UUID(input));
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    return {
      id: category.id.value,
      name: category.name,
      description: category.description,
      isActive: category.isActive,
      createdAt: category.createdAt,
    };
  }
}
