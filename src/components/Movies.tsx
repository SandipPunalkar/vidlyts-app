import React from "react";
import Genre from "../models/genreTypes";
import Movie from "../models/movieTypes";
import _ from "lodash";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/ListGroup";
import Pagination from "./common/Pagination";
import MoviesTable from "./MoviesTable";
import sortColumnType from "../models/sortColumnType";

interface MoviesProps {}

interface MoviesState {
  movies: Movie[];
  genres: Genre[];
  pageSize: number;
  currentPage: number;
  selectedGenre: Genre;
  sortColumn: sortColumnType;
}

class Movies extends React.Component<MoviesProps, MoviesState> {
  constructor(props: MoviesProps) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      selectedGenre: { _id: "", name: "" },
      sortColumn: { path: "title", order: "asc" },
    };
  }

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }
  handleDelete = (movie: Movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie: Movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre: Genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSort = (sortColumn: sortColumnType) => {
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn,
    } = this.state;
    if (count === 0) return <p>There are no movies in the database.</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
