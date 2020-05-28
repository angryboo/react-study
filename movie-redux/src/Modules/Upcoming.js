/* eslint-disable import/prefer-default-export */
// action type
const INIT = 'UPCOMING/INIT';
const LOADING = 'UPCOMING/LOADING';
const SUCCESS = 'UPCOMING/SUCCESS';
const NEXT_PAGE = 'UPCOMING/PAGE';
const ERROR = 'UPCOMING/ERROR';

export const init = () => ({ type: INIT });
export const loading = () => ({ type: LOADING });
export const success = (data) => ({ type: SUCCESS, upcoming: data });
export const nextPage = (page) => ({ type: NEXT_PAGE, nextPage: page });
export const error = (e) => ({ type: ERROR, error: e });

// initial state
const initialState = {
  upcoming: [],
  nextPage: 1,
  error: {
    state: false,
    message: null,
  },
  loading: false,
};

// reducer
export default function upcoming(state = initialState, action) {
  switch (action.type) {
    case INIT:
      console.log('언마운트 시 초기화');
      return {
        upcoming: initialState.upcoming,
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
        upcoming: [...state.upcoming, ...action.upcoming],
        nextPage: state.nextPage,
        loading: false,
      };
    case NEXT_PAGE:
      console.log('NextPage', action.nextPage);
      return { ...state, nextPage: action.nextPage };
    case ERROR:
      return {
        ...state,
        error: { ...action.error },
      };
    default:
      return state;
  }
}
