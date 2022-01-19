export class OmdbMovieDto {
    imdbId: string;

    Title: string;

    Year: string;

    Type: string;

    Poster: string;
}

export class MovieDto {
    imdbId: string;

    title: string;

    year: string;

    type: string;

    poster: string;

    public static fromOmdbMovie(data: OmdbMovieDto): MovieDto {
        return {
            imdbId: data.imdbId,
            title: data.Title,
            type: data.Type,
            poster: data.Poster,
            year: data.Year,
        };
    }
}
