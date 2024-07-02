import HttpError from "../utils/HttpError.js";

const validateBody = schema => {
    const func = async(req, res, next)=> {
        try {
            await schema.validateAsync(req.body, {
                abortEarly: false,
            });
            next();
        }
        catch(error) {
            console.log(error.message);
            next(HttpError(400, error.message));
        }
    }

    return func;
}

export default validateBody;
