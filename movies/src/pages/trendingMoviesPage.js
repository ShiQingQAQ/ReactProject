import React from "react";
import { getTrendingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const getTrendingMoviesPage = () => {
    const { data, error, isLoding, isError } = useQuery('trending', getTrendingMovies);

    if(isLoding) {
        return <Spinner />;
    }

    if (isError) {
        return<h1>{error.message}</h1>;
    }

    const movies =data.results;

    return(
        <PageTemplate
        title="Trending Movies"
        movies={movies}
        action={(movie)=>{
            return <AddToFavoritesIcon movie={movie} />;
        }}
        />
    );
};

export default TrendingMoviesPage;