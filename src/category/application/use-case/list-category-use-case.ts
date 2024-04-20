import { IUseCase } from "../../../shared/application/use-case-interface";
import {
  ISearchableRepository,
  SearchParams,
  SearchResult,
} from "../../../shared/domain/repository/repository-interface";
import { UUID } from "../../../shared/domain/value-object/uuid.value-object";
import { Category } from "../../domain/category-entity";
import {
  CategoryMapperOutput,
  CategoryOutputMapper,
} from "../common/category-output-mapper";

export type ListCategoryUseCaseInput = SearchParams<string>;
export type ListCategoryUseCaseOutput = Omit<
  SearchResult<Category>,
  "items"
> & {
  items: CategoryMapperOutput[];
};

export class ListCategoryUseCase
  implements IUseCase<ListCategoryUseCaseInput, ListCategoryUseCaseOutput>
{
  constructor(
    private readonly categoryRepository: ISearchableRepository<Category, UUID>,
  ) {}

  async execute(
    input: ListCategoryUseCaseInput,
  ): Promise<ListCategoryUseCaseOutput> {
    const result = await this.categoryRepository.search(input);
    return {
      ...result,
      items: result.items.map((category) =>
        CategoryOutputMapper.toDTO(category),
      ),
    };
  }
}
