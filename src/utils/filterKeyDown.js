
export default (filters) => (e) => {
  const BreakException = 'BreakForEach';
  try {
    filters.forEach(({ allowedKeys, func }) => {
      if (allowedKeys.indexOf(e.key) !== -1) {
        func(e);
        throw BreakException
      }
    })
  } catch (error) {
    if (error !== BreakException) throw error
  }
}
