/* eslint-disable object-curly-newline */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Upcoming from '../Components/Pages/Upcoming';
import { init, loading, success, nextPage, error } from '../Modules/Upcoming';
import { movies } from '../API/MovieAPI';

function UpcomingContainer() {
  const { $upcoming, $loading, $nextPage } = useSelector((state) => ({
    $upcoming: state.Upcoming.upcoming,
    $loading: state.Upcoming.loading,
    $nextPage: state.Upcoming.nextPage,
  }));

  const dispatch = useDispatch();
  const onInit = () => dispatch(init());
  const onLoading = () => dispatch(loading());
  const onSuccess = (data) => dispatch(success(data));
  const onNextPage = (page) => dispatch(nextPage(page));
  const onError = () => dispatch(error());

  // popular data 취득 함수
  const fetchUpcoming = async () => {
    console.log('upcoming', $nextPage);
    onLoading();
    try {
      const promise = await movies.getUpcoming($nextPage);
      console.log(promise.data.results);
      if (promise.status === 200) {
        onSuccess(promise.data.results);
        onNextPage(promise.data.page + 1);
      } else {
        onError(promise.statusText);
      }
    } catch (e) {
      console.log('error');
      onError(e);
    }
  };

  // 인피니티 스크롤
  const setScrollEvent = () => {
    const dom = document.documentElement;
    if (dom.scrollTop + dom.clientHeight === dom.offsetHeight) {
      fetchUpcoming();
    }
  };

  return (
    <Upcoming
      init={onInit}
      upcoming={$upcoming}
      loading={$loading}
      nextPage={$nextPage}
      fetch={fetchUpcoming}
      setScrollEvent={setScrollEvent}
    />
  );
}

export default UpcomingContainer;
