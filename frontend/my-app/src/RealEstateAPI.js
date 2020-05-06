const api = 'http://127.0.0.1:5000'

export const getAll = (address) =>
  fetch(`${api}/analysis?address=${address}`)
   .then(results => results.json())
   .then(data => data)
