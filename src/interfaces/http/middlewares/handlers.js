exports.notFoundHandler = (req, res, next) => {
  return res.status(404).json({
    status: '404',
    message: `The URL ${req.url} does not exist. Please try another route`
  });
};

exports.exceptionHandler = (err, req, res, next) => {
  if(!err.statusCode) err.statusCode = 500;
  return res.status(err.statusCode).json({
    status: '572',
    description: 'Internal or untracked errors',
    message: err.message
  });
};