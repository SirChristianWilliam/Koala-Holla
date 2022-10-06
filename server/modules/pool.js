const pg = require('pg');
const config = {
    database: 'koala_holla',
    host: 'localhost',
    port: 5432,
 };
const pool = new pg.Pool(config);
pool.on("connect", () => {
    console.log("conected to postgres");
});
pool.on("error", (err) => {
    console.log("error connecting to postgres", err);
});
module.exports = pool;