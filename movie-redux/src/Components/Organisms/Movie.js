/* eslint-disable react/prop-types */
import React from 'react';
import './CSS/Movie.css';

function Movie({ info, type }) {
  return (
    <li className="Movie">
      <img
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w500/${info.poster_path}`}
        alt="이미지를 불러올수 없습니다"
      />
      <h3 className="movie-title">{info.title}</h3>
      {type === 'popular' && (
        <span className="popularity">{info.popularity}</span>
      )}
    </li>
  );
}

export default Movie;
