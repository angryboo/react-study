/* eslint-disable object-curly-newline */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Popular from '../Components/Pages/Popular';
import { init, loading, success, nextPage, error } from '../Modules/Poular';
import { movies } from '../API/MovieAPI';

function PopularContainer() {
  const { $popular, $loading, $nextPage } = useSelector((state) => ({
    $popular: state.Popular.popular,
    $loading: state.Popular.loading,
    $nextPage: state.Popular.nextPage,
  }));

  const dispatch = useDispatch();
  const onInit = () => dispatch(init());
  const onLoading = () => dispatch(loading());
  const onSuccess = (data) => dispatch(success(data));
  const onNextPage = (page) => dispatch(nextPage(page));
  const onError = () => dispatch(error());

  // popular data 취득 함수
  const fetchPopular = async () => {
    console.log($nextPage);
    onLoading();
    try {
      const promise = await movies.getPopular($nextPage);
      console.log(promise.data);
      if (promise.status === 200) {
        onSuccess(promise.data.results);
        onNextPage(promise.data.page + 1);
      } else {
        onError(promise.statusText);
      }
    } catch (e) {
      onError(e);
    }
  };

  // 인피니티 스크롤
  const setScrollEvent = () => {
    const dom = document.documentElement;
    if (dom.scrollTop + dom.clientHeight === dom.offsetHeight) {
      console.log('스크롤', $nextPage);
      fetchPopular();
    }
  };

  return (
    <Popular
      init={onInit}
      popular={$popular}
      loading={$loading}
      nextPage={$nextPage}
      fetch={fetchPopular}
      setScrollEvent={setScrollEvent}
    />
  );
}

export default PopularContainer;
