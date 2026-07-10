const { ZodError } = require("zod");

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const data = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      req.body = data.body;
      req.params = data.params;
      req.query = data.query;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: error.issues.map((issue) => ({
            field: issue.path.slice(1).join("."),
            message: issue.message,
          })),
        });
      }

      next(error);
    }
  };
};

module.exports = validate;