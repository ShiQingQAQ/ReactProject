import React, { useState, useEffect } from "react";
import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const TopRatedMoviesPage = () => {
  const [page, setPage] = useState(1); // 当前页码状态

  const { data, error, isLoading, isError } = useQuery(
    ['topRated', page], // 使用页码作为查询键的一部分
    () => getTopRatedMovies(page), // 将页码传递给 API 函数
    { keepPreviousData: true } // 保留上一页数据，避免闪烁
  );

  // 滚动到顶部
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <>
      <PageTemplate
        title="Top Rated Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />;
        }}
      />
      {/* 分页控制 */}
      <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}> {page} </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === data.total_pages} // 确保页码不会超过总页数
        >
          Next
        </button>
      </div>
    </>
  );
};

export default TopRatedMoviesPage;
