import bcrypt from "bcrypt"
const SALT_ROUNDS = 10
export const encryptPassword = async (password: string) => {
    try {
        const genSalt = await bcrypt.genSalt(SALT_ROUNDS)
        const hashedPassword = await bcrypt.hash(password, genSalt)
        return hashedPassword
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
        throw new Error("An error occurred while encrypting the password")
    }
}
 
export const comparePassword = async (password: string, hashed: string) => {
    try {
        return await bcrypt.compare(password, hashed);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
        throw new Error("An error occurred while comparing the password")
    }
}