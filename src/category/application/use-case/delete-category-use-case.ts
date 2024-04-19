import { IUseCase } from "../../../shared/application/use-case-interface";
import { UUID } from "../../../shared/domain/value-object/uuid.value-object";
import { ICategoryRepository } from "../../domain/category-repository";

export class DeleteCategoryUseCase implements IUseCase<string, void> {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: string): Promise<void> {
    await this.categoryRepository.delete(new UUID(input));
  }
}
