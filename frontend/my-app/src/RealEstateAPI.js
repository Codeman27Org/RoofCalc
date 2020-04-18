const api = 'http://localhost:5000'


export const getAll = (address) => {
  var url = new URL(`${api}/analysis`),
  params = {address};

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  fetch(url, {
    method: 'GET'
    })
  .then(results => results.json())
  .then(data => console.log(data))
}
