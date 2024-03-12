// src/helpers/errorHelper.js
export const handleServerError = (res, error) => {
  console.log(error.message);
  res.status(500).json({ message: error.message });
};
