import React, { useState }from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const HomePage = () => {
  const [minRating, setMinRating] = useState(0);//新增状态
  const {  data, error, isLoading, isError }  = useQuery('discover', getMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

   // 应用最低评分过滤
  const filteredMovies = movies.filter(movie => movie.vote_average >= minRating);

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <>
    <div>
      {/* 新增的过滤选项 */}
      <lable htmlFor="minRating">Minimum Rating:</lable>
      <input
        type="number"
        id="minRating"
        name="minRating"
        min="0"
        max="10"
        step="0.1"
        value={minRating}
        onChange={(e) => setMinRating(e.target.value)}
      />
    </div>

    <PageTemplate
      title="Discover Movies"
      movies={filteredMovies} // 使用过滤后的电影列表
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
    </>
);
};
export default HomePage;