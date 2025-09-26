import bcrypt from "bcrypt";

/**
 * Metodo que encripta la contraseña
 * @param {String} password
 * @returns
 */
export const createHash = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

/**
 *
 * @param {Strinh} user
 * @param {String} password
 * @returns
 */
export const isValidPassword = (password, hashedPassword) =>
    bcrypt.compareSync(password, hashedPassword);
