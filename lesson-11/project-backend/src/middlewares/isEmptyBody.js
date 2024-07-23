import HttpError from "../utils/HttpError.js";

const isEmptyBody = (req, res, next)=> {
    if(!Object.keys(req.body).length) {
        return next(HttpError(400, "Body cannot be empty"))
    }
    next();
}

export default isEmptyBody;
