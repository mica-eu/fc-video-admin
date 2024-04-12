import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "categories", timestamps: false })
export class CategoryModel extends Model {
  @Column({ primaryKey: true, type: DataType.UUID })
  declare categoryId: string;

  @Column({ allowNull: false, type: DataType.STRING })
  declare name: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  declare description: string | null;

  @Column({ allowNull: false, type: DataType.BOOLEAN })
  declare isActive: boolean;

  @Column({ allowNull: false, type: DataType.DATE })
  declare createdAt: Date;
}
