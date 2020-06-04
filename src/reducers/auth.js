const INITIAL_STATE = {
  authed: false,
  authing: true,
  token: ''
}

const auth = (state = INITIAL_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case 'AUTH_REQUEST': {
      return {
        ...state,
        authing: true
      }
    }
    case 'AUTH_SUCCESS': {
      return {
        ...state,
        authed: true,
        authing: false,
        token: payload.token
      }
    }
    case 'AUTH_LOGOUT': {
      return {
        ...state,
        authed: false,
        token: ''
      }
    }
    default: {
      return state
    }
  }
}

export default auth
