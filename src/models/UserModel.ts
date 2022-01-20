import {
    Column,
    Model,
    Table,
    DataType,
    HasMany,
    CreatedAt,
    UpdatedAt,
} from "sequelize-typescript";
import { FavoriteMovieModel } from "@apps/models/FavoriteMovieModel";

interface IUserModel {
    id?: number;
    name: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    favoriteMovies?: Array<FavoriteMovieModel>;
}

@Table({ tableName: "users", timestamps: true })
export class UserModel
    extends Model<IUserModel, IUserModel>
    implements IUserModel
{
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    })
    id?: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        field: "created_at",
        allowNull: true,
        type: DataType.DATE,
    })
    @CreatedAt
    createdAt?: Date;

    @Column({
        field: "updated_at",
        allowNull: true,
        type: DataType.DATE,
    })
    @UpdatedAt
    updatedAt?: Date;

    @HasMany(() => FavoriteMovieModel)
    favoriteMovies?: Array<FavoriteMovieModel>;
}
