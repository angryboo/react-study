function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    console.log('thunk', extraArgument);
    if (typeof action === 'function') {
      console.log('함수!', action);
      return action(dispatch, getState, extraArgument);
    }
    console.log('객체!', action);
    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
