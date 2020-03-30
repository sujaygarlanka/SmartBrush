export default function authReducer(
  state = {
    user: null,
    isLoading: false,
    error: null,
  },
  action,
) {
  switch (action.type) {
    case 'SET_USER':
      return {user: action.payload, isLoading: false};
    case 'IS_LOADING':
      return {isLoading: true}
    case 'AUTH_FAILURE':
      return {error: action.payload, isLoading: false};
  }
  return state;
}
