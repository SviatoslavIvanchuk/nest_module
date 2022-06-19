export const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error('Img Format not valid'), false);
  }
  return cb(null, true);
};
