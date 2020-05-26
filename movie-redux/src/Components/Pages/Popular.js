/* eslint-disable object-curly-newline */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import Movie from '../Organisms/Movie';
import Loading from '../Templates/Loading';

function Popular({ init, popular, loading, nextPage, fetch, setScrollEvent }) {
  useEffect(() => {
    fetch();
    return () => {
      init();
    };
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', setScrollEvent);
    return () => {
      document.removeEventListener('scroll', setScrollEvent);
    };
  }, [nextPage]);
  return (
    <div className="Popular">
      {loading && <Loading />}
      <ul className="movie-list">
        {popular.map((movie) => (
          <Movie key={movie.id} info={movie} type="popular" />
        ))}
      </ul>
    </div>
  );
}

export default React.memo(Popular);
