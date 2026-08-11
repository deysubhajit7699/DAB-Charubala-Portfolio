/** Wraps an async route handler so rejected promises reach the error handler. */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

/**
 * Guards every write route. Without this the API would let anyone on the
 * internet edit or delete your portfolio.
 * Send the key as `x-admin-key: <ADMIN_KEY>`.
 */
export function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_KEY

  if (!expected) {
    return res.status(503).json({
      error: 'ADMIN_KEY is not configured on the server — write routes are disabled.',
    })
  }

  const provided = req.get('x-admin-key')
  if (!provided || provided !== expected) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  next()
}

export function notFound(req, res) {
  res.status(404).json({ error: `Not found: ${req.method} ${req.originalUrl}` })
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  console.error(err)

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: Object.fromEntries(
        Object.entries(err.errors).map(([field, e]) => [field, e.message])
      ),
    })
  }

  if (err.code === 11000) {
    return res.status(409).json({
      error: 'Duplicate value',
      details: err.keyValue,
    })
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ error: `Invalid ${err.path}: ${err.value}` })
  }

  res.status(err.status || 500).json({ error: err.message || 'Server error' })
}
