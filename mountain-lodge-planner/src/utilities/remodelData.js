const modelDatabase = data => Object.entries(data)
  .map(lodge => ({ ...lodge[1], id: lodge[0] }))

export default modelDatabase