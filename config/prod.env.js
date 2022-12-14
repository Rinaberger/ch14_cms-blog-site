require('dotenv').config();

module.exports = {
    HOST: process.env.PROD_HOST,
    USER: process.env.PROD_USER,
    PASSWORD: process.env.PROD_PW,
    PROD_DB: process.env.PROD_DB
}