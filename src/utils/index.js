export const generateStart = () => {
  const start = new Date()
  start.setDate(start.getDate() - 5)
  return start
}

export const generateEnd = () => {
  const end = new Date()
  return end
}
