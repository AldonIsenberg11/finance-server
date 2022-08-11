/**  * This is a wrapper so that express properly handles an error from async middleware */
module.exports = function wrapHandler(asyncFn) {
    return function asyncHandler(req, res, next) {
      asyncFn(req, res, next).catch(next)
    }
  }