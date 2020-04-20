const api = 'http://localhost:5000'


export const getAll = (address) =>
  fetch(`${api}/analysis?address=${address}`, {
    method: 'GET',
    })
  .then(results => results.json())
  .then(data => data)
