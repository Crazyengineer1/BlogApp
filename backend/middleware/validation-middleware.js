
const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody;
        next();
    } catch (e) {
        res.status(400).json({ msg: e.errors[0].message })
    }
}

module.exports = validate;