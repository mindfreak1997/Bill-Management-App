const initialState = {
  isLogin: false,
  account: {}
}
export const adminReducers = (state = initialState, action) => {
  switch (action.type) {

    case 'LOGIN': {
      return { ...state, isLogin: action.payload }
    }
    case 'ACCOUNT_DETAIL': {
      return { ...state, account: { ...action.payload } }
    }
    default: {
      return { ...state }
    }

  }
}
