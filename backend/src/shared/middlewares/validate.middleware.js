import {ZodError} from "zod";

export const validate = (schema) => {
    return (req,res,next) => {
        try {
            schema.parse({
                body: req.body, 
                params: req.params, 
                query: req.query,
            });
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                error.statusCode = 400;
                error.message = error.issues[0].message;
            }
            next(error);
        }
    };
}; 