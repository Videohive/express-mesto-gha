const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;
const NOT_FOUND = 404;

function handleErrors (error, response) {
  if (error.name === 'CastError' || error.name === 'ValidationError') {
    return response.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
  }

  return response.status(INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка ${INTERNAL_SERVER_ERROR}` });
};

function handleErrorNotFound (obj, response, string){
  if(!obj){
    return response.status(NOT_FOUND).send({ message: string })
  }
};

module.exports = {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  handleErrors,
  handleErrorNotFound
};