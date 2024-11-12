import React from "react";
import { getTopratedMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const TopRatedMoviesPage = () => {
    const { data, error, isLoading, isError } = useQuery('Toprated', getTrendingMovies);
  
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