export function getCurrentTime(req: Request): number {
  if (process.env.TEST_MODE === '1') {
    const header = req.headers.get('x-test-now-ms')
    if (header) {
      return parseInt(header, 10)
    }
  }
  return Date.now()
}