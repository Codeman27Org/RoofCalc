const api = 'http://127.0.0.1:5000'

// export const getAll = (address) =>
//   fetch(`${api}/analysis?address=${address}`)
//    .then(results => results.json())
//    .then(data => data)

export const getAll = (address) =>
  fetch(`${api}/analysis?address=${address}`)
   .then(response => {
     if(!response.ok) {
       throw Error(response.statusText)
     }
     return response.json()
   })
   .then(data => {
     return data
   })
