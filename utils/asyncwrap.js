
// error handling function
function asyncWrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}

module.exports = asyncWrap;