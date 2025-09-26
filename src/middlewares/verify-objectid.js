import mongoose from "mongoose";

export const verifyObjectId = (paramsName = []) => {
    return (req, res, next) => {
        const names = paramsName.length ? paramsName : ["id"];

        for (const paramName of names) {
            if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
                return res
                    .status(400)
                    .json({ message: `Invalid ${paramName} format` });
            }
        }

        next();
    };
};
