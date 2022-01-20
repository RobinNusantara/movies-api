import {
    Column,
    Model,
    Table,
    DataType,
    ForeignKey,
    CreatedAt,
    UpdatedAt,
} from "sequelize-typescript";
import { UserModel } from "@apps/models/UserModel";

interface IFavoriteMovieModel {
    id?: number;
    userId: number;
    imdbId: string;
    title: string;
    year: string;
    poster: string;
    createdAt?: Date;
    updatedAt?: Date;
}

@Table({ tableName: "favorite_movies", timestamps: true })
export class FavoriteMovieModel
    extends Model<IFavoriteMovieModel, IFavoriteMovieModel>
    implements IFavoriteMovieModel
{
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    })
    id?: number;

    @ForeignKey(() => UserModel)
    @Column({
        field: "user_id",
        type: DataType.BIGINT,
        allowNull: false,
    })
    userId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    imdbId: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    year: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    poster: string;

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
}
