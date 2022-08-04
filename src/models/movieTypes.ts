import Genre from "./genreTypes";

export default interface Movie {
  _id: string;
  title: string;
  genre: Genre;
  numberInStock: number;
  dailyRentalRate: number;
  publishDate: string;
  liked: boolean;
}
