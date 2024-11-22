import React, { useState, useEffect}from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const HomePage = () => {
  const [page, setPage] = useState(1);

  const {  data, error, isLoading, isError }  = useQuery(['discover', page], () => getMovies(page),{
    keepPreviousData: true,
  });

// 滚动到顶部
useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 平滑滚动
  });
}, [page]); // 依赖于 page，当 page 更新时触发

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <>
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
     {/* 分页控制 */}
     <div style={{ display:"flex", justifyContent:"center", margin:"20px"}}>
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1,1))}
        disabled={page===1}
        >
          Previous
        </button>
        <span style={{margin:"0 10px"}}> {page} </span>
        <button
          onClick={() => setPage((prev) => prev+1)}
          disabled={page === data.total_pages}// 确保不能超过总页数
        >
          Next
        </button>
     </div>
    </>
);
};
export default HomePage;