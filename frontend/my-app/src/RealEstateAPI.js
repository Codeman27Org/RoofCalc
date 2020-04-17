const api = 'http://localhost:5000'


export const getAll = (address) => {
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  var url = new URL(`${api}/analysis`),
  params = {address};
  fetch(url, {
    method: 'Get'
  })

  // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  // fetch(url, {
  //   method: 'GET',
  //   mode: 'cors'
  //   })
  // .then(results => results.json())
  // .then(data => console.log(data))
}
