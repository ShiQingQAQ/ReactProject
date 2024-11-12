import React from "react";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import PageTemplate from '../components/templateMovieListPage';
import { getUpcomingMovies } from "../api/tmdb-api";
import PlaylistAddIconComponent from '../components/cardIcons/playlistAddIcon';

const UpcomingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery('upcoming', getUpcomingMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <PlaylistAddIconComponent movie={movie} />;
      }}
    />
  );
};

export default UpcomingMoviesPage;