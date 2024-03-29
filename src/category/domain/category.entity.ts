import { EntityValidationError } from "../../shared/domain/validator/validation.error";
import { UUID } from "../../shared/domain/value-object/uuid.value-object";
import { CategoryValidatorFactory } from "./category.validator";

export type CategoryConstructorProps = {
  id?: UUID;
  name: string;
  description?: string | null;
  isActive?: boolean;
  createdAt?: Date;
};

export type CategoryCreateCommand = {
  name: string;
  description?: string;
  isActive?: boolean;
};

export class Category {
  id: UUID;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;

  constructor(props: CategoryConstructorProps) {
    this.id = props.id ?? new UUID();
    this.name = props.name;
    this.description = props.description ?? null;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt ?? new Date();
  }

  changeName(name: string): void {
    this.name = name;
    Category.validate(this);
  }

  changeDescription(description: string): void {
    this.description = description;
    Category.validate(this);
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }

  toJSON(): object {
    return {
      id: this.id.value,
      name: this.name,
      description: this.description,
      isActive: this.isActive,
      createdAt: this.createdAt,
    };
  }

  static validate(entity: Category): void {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(entity);
    if (!isValid) {
      throw new EntityValidationError(validator.errors!);
    }
  }

  static create(props: CategoryConstructorProps): Category {
    const category = new Category(props);
    Category.validate(category);
    return category;
  }
}
