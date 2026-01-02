const { db } = require('./database');
// Import bcrypt for password hashing
const bcrypt = require('bcrypt');

// Function to create a new user
function createUser(email, password) {
    // Return a promise to handle asynchronous database operation
    return new Promise(async(resolve, reject) => {
        try {
            // Hash the password before storing it
            const saltRounds = 10;
            const passwordHash = await bcrypt.hashSync(password, saltRounds);
            // Prepare SQL statement to insert new user
            const sql = `
            INSERT INTO users (email, password_hash)
            VALUES (?, ?)
            `;
            db.run(
                sql,
                [email, passwordHash],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            id: this.lastID,
                            email
                        });
                    }
                }
            );
        } catch (error) {
            reject(error);
        }
    });
}

// Function to get a user by email
function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT * FROM users WHERE email = ?
        `;
        db.get(sql,
            [email],
            (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        );
    });
}

module.exports = {
  createUser,
  getUserByEmail
};
