import CustomError from "../utils/customError.js";
import { RESPONSE_ERROR_SERVER_ERROR } from "../config/systemConfig.js";

export default (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({ status: false, message: err.message });
  } else {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, message: RESPONSE_ERROR_SERVER_ERROR });
  }
};
