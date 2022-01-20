// Import Dependencies
import { IsNotEmpty, IsString } from "class-validator";

// Import Applications
import { FavoriteMovieModel } from "@apps/models/FavoriteMovieModel";

export class OmdbMovieDto {
    imdbID: string;

    Title: string;

    Year: string;

    Type: string;

    Poster: string;
}

export class MovieDto {
    imdbId: string;

    title: string;

    year: string;

    type?: string;

    poster: string;

    public static fromOmdbMovie(data: OmdbMovieDto): MovieDto {
        return {
            imdbId: data.imdbID,
            title: data.Title,
            type: data.Type,
            poster: data.Poster,
            year: data.Year,
        };
    }

    public static fromMovieModel(data: FavoriteMovieModel): MovieDto {
        return {
            imdbId: data.imdbId,
            title: data.title,
            poster: data.poster,
            year: data.year,
        };
    }
}

export class InsertFavoriteMovieDto {
    @IsString()
    @IsNotEmpty()
    imdbId: string;
}
