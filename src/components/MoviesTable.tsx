import React, { Component } from "react";
import ColumnsType from "../models/columnsType";

import Movie from "../models/movieTypes";
import sortColumnType from "../models/sortColumnType";

import Like from "./common/Like";
import TableHeader from "./common/TableHeader";

interface MoviesTableProps {
  movies: Movie[];
  sortColumn: sortColumnType;
  onSort: (path: sortColumnType) => void;
  onLike: (movie: Movie) => void;
  onDelete: (movie: Movie) => void;
}
interface MoviesHeaderState {
  columns: ColumnsType[];
}

class MoviesTable extends Component<MoviesTableProps, MoviesHeaderState> {
  constructor(props: MoviesTableProps) {
    super(props);
    this.state = {
      columns: [
        { key: "", path: "title", label: "Title" },
        { key: "", path: "genre.name", label: "Genre" },
        { key: "", path: "numberInStock", label: "Stock" },
        { key: "", path: "dailyRentalRate", label: "Rate" },
        { key: "like", path: "", label: "" },
      ],
    };
  }
  raiseSort = (path: string) => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };
  render() {
    const { movies, sortColumn, onLike, onDelete, onSort } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.state.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like liked={movie.liked} onLike={() => onLike(movie)} />
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
