import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';

export interface ArticuloAttributes {
  id?: number; // opcional para la creación
  nombre: string;
  fecha_modif: Date;
  marca: string;
  estado: boolean;
}

export interface ArticuloCreationAttributes extends Optional<ArticuloAttributes, 'id' | 'fecha_modif'> {}
@Table({
  tableName: 'articulos',
  timestamps: false, // ya estás manejando fecha_modif manualmente
})
export class Articulo extends Model<ArticuloAttributes, ArticuloCreationAttributes>
  implements ArticuloAttributes {
  
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  nombre!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  fecha_modif!: Date;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  marca!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  estado!: boolean;
}
