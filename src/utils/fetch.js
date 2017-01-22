export default (endpoint) => {
  if (typeof endpoint !== 'string') {
    throw new Error('Endpoint must be a string')
  }

  return fetch(endpoint, {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then(response => {
        let data = []

        if (response.ok) {
          try {
            data = response.json()
          } catch (err) {
            console.warn(err) // eslint-disable-line no-console
          }
        } else if (response.status === 404) {
          return []
        } else {
          throw new Error('Server error')
        }

        return data
      },
      err => {
        console.warn(err) // eslint-disable-line no-console
      }
    )
}
