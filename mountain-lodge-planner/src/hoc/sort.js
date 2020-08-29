const compare = (a, b) => a > b ? 1 : a < b ? -1 : 0

const sort = (list) =>
  list.sort((a, b) => compare(a.name, b.name))

export default sort