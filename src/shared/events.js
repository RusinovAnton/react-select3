const makeEventMiddleware = functionName => func => event => {
    if (event && event[functionName]) event[functionName]()
    func(event)
}

export const preventDefault = makeEventMiddleware('preventDefault')
export const stopPropagation = makeEventMiddleware('stopPropagation')
