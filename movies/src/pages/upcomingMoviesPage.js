import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import PageTemplate from '../components/templateMovieListPage';
import { getUpcomingMovies } from "../api/tmdb-api";
import PlaylistAddIconComponent from '../components/cardIcons/playlistAddIcon';

const UpcomingMoviesPage = () => {
  const [page, setPage] = useState(1); // 当前页码状态

  // 调用 API 获取当前页数据
  const { data, error, isLoading, isError } = useQuery(
    ['upcoming', page], // 使用页码作为查询键的一部分
    () => getUpcomingMovies(page),
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
        title="Upcoming Movies"
        movies={movies}
        action={(movie) => {
          return <PlaylistAddIconComponent movie={movie} />;
        }}
      />
      {/* 分页控制 */}
      <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          上一页
        </button>
        <span style={{ margin: "0 10px" }}>第 {page} 页</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === data.total_pages}
        >
          下一页
        </button>
      </div>
    </>
  );
};

export default UpcomingMoviesPage;