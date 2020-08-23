const api = 'http://127.0.0.1:5000'
// const api = 'http://ec2-34-208-252-225.us-west-2.compute.amazonaws.com'

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
