/* eslint-disable object-curly-newline */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import Movie from '../Organisms/Movie';
import Loading from '../Templates/Loading';

function Upcoming({
  init,
  upcoming,
  loading,
  nextPage,
  fetch,
  setScrollEvent,
}) {
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
    <div className="Upcoming">
      {loading && <Loading />}
      <ul className="movie-list">
        {upcoming.map((movie) => (
          <Movie key={movie.id} info={movie} type="upcoming" />
        ))}
      </ul>
    </div>
  );
}

export default React.memo(Upcoming);
