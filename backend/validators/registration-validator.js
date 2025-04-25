const { z } = require('zod')

const validationSchema = z.object({
    username: z
        .string({ required_error: "username is required" })
        .trim()
        .min(3, { message: "Username is of at least 3 characters" })
        .max(255, { message: "Username is too long" }),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" }),

    password: z
        .string({ message: "Password is required" })
        .min(3, { message: "Password must contain at least 3 characters" })
        .max(1024, { message: "Password should not be greater than 1024 characters" }),

    isAdmin: z
        .boolean()
        .default(false),
})

module.exports = validationSchema;