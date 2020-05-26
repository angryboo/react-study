/* eslint-disable import/prefer-default-export */
// action type
const INIT = 'POPULAR/INIT';
const LOADING = 'POPULAR/LOADING';
const SUCCESS = 'POPULAR/SUCCESS';
const NEXT_PAGE = 'POPULAR/PAGE';
const ERROR = 'POPULAR/ERROR';

export const init = () => ({ type: INIT });
export const loading = () => ({ type: LOADING });
export const success = (data) => ({ type: SUCCESS, popular: data });
export const nextPage = (page) => ({ type: NEXT_PAGE, nextPage: page });
export const error = (e) => ({ type: ERROR, error: e });

// initial state
const initialState = {
  popular: [],
  nextPage: 1,
  error: {
    state: false,
    message: null,
  },
  loading: false,
};

// reducer
export default function popular(state = initialState, action) {
  switch (action.type) {
    case INIT:
      console.log('언마운트 시 초기화');
      return {
        popular: initialState.popular,
        nextPage: initialState.nextPage,
        error: { ...initialState.error },
        loading: initialState.loading,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS:
      console.log('완료');
      return {
        ...state,
        popular: [...state.popular, ...action.popular],
        nextPage: state.nextPage,
        loading: false,
      };
    case NEXT_PAGE:
      console.log('NextPage', action.nextPage);
      return { ...state, nextPage: action.nextPage };
    case ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
