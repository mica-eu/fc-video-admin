import { Column, DataType, Model, Table } from "sequelize-typescript";

export type CategoryModelAttributes = {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
};

@Table({ tableName: "categories", timestamps: false })
export class CategoryModel extends Model<CategoryModelAttributes> {
  @Column({ primaryKey: true, type: DataType.UUID })
  declare id: string;

  @Column({ allowNull: false, type: DataType.STRING })
  declare name: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  declare description: string | null;

  @Column({ allowNull: false, type: DataType.BOOLEAN })
  declare isActive: boolean;

  @Column({ allowNull: false, type: DataType.DATE })
  declare createdAt: Date;
}
