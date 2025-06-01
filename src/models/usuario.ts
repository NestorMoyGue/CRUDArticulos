import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
} from 'sequelize-typescript';

export interface UsuarioAttributes {
    id?: number;
    nombre: string;
    email: string;
    password: string;
    fecha_creacion?: Date;
    fecha_modificacion?: Date;
}

@Table({ tableName: 'usuarios', timestamps: true , createdAt: 'fecha_creacion',
  updatedAt: 'fecha_modificacion',})
export class Usuario extends Model<UsuarioAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    nombre!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
        defaultValue: DataType.NOW,
    })
    fecha_creacion!: Date;
    @Column({
        type: DataType.DATE,
        allowNull: true,
        defaultValue: DataType.NOW,
    })
    fecha_modificacion!: Date;

}
