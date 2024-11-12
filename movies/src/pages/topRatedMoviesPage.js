import React from "react";
import { getTopRatedMovies } from "../api/tmdb-api"; // 确保这里导入的是 getTopRatedMovies
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const TopRatedMoviesPage = () => {
  // 使用 'topRated' 作为查询键，并调用 getTopRatedMovies
  const { data, error, isLoading, isError } = useQuery('topRated', getTopRatedMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};

export default TopRatedMoviesPage;
