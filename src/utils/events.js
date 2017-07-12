const makeEventMiddleware = functionName => func => event => {
  if (event && event[functionName]) event[functionName]();
  if (func) func(event)
};

export const preventDefault = makeEventMiddleware('preventDefault');
export const stopPropagation = makeEventMiddleware('stopPropagation');
