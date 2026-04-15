const pkg = require("pg");
require("dotenv").config();


const {Pool} = pkg;

const pool = new Pool({
    user: process.env.DBUSER,
    password: process.env.PASSWORD,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DBREF
});

module.exports = pool;