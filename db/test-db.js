const { pool } = require("./database");

(async () => {
    const res = await pool.query("SELECT NOW()");
    console.log(res.rows);
    process.exit(0);
})();