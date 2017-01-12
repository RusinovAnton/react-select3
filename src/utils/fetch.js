export default (endpoint) => {
    if (typeof endpoint !== 'string') {
        throw new Error('Endpoint must be a string')
    }

    return fetch(endpoint, {
        method: 'GET',
        credentials: 'same-origin',
    })
        .then(response => {
            if (response.ok) {
                return response
                    .text()
                    .then(text => text ? JSON.parse(text) : 'ok')
            }

            return response
                .text()
                .then(error => {
                    throw error
                })
        })
}
