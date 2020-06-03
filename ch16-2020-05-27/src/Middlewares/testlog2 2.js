const midware2 = function (store) {
  console.log('미들웨어2 첫번째 함수 실행', '매개변수 store', store);
  return function (next) {
    console.log('미들웨어2 두번째 함수 실행', '매개변수 next', next);
    return function (action) {
      console.log('미들웨어2 세번째 함수 실행', '매개변수 action', action);
      const result = next(action);
      console.log('미들웨어2 result return', result);
      return result;
    };
  };
};

export default midware2;
