export function isAuthed (state) {
  return state.auth.authed
}

export function getToken (state) {
  return state.auth.token
}
