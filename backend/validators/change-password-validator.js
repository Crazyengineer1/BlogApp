const { z } = require('zod')

const validationSchema = z.object({
    op: z
        .string({ message: "Password is required" })
        .min(3, { message: "Password must contain at least 3 characters" })
        .max(1024, { message: "Password should not be greater than 1024 characters" }),

    np: z
        .string({ message: "Password is required" })
        .min(3, { message: "Password must contain at least 3 characters" })
        .max(1024, { message: "Password should not be greater than 1024 characters" }),

})

module.exports = validationSchema;