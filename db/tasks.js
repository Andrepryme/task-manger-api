const { db } = require('./database');

// Function to create a new task
function createTask(title) {
    return new Promise((resolve, reject) => {
        const sql =  "INSERT INTO tasks (title) VALUES (?)";
        db.run(
            sql,
            [title],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        id: this.lastID,
                        title
                    });
                }
            }
        );
    });
}

// Function to get a task by ID
function getTaskById(id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM tasks WHERE id = ?";
        db.get(
            sql,
            [id],
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

// Function to get all tasks
function getAllTasks() {
    return new Promise((resolve, reject) => {
        const sql =  "SELECT * FROM tasks";
        db.all(
            sql,
            (err, rows) => {
                // Handle any errors
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
}

function updateTask(id, fields) {
    // Build the SQL query dynamically based on provided fields
    const updates = [];
    // Parameters array for the SQL query
    const values = [];
    // Only update the title if it's provided
    if (fields.title !== undefined) {
        updates.push("title = ?");
        values.push(fields.title);
    }
    // Only update the completed status if it's provided
    if (fields.completed !== undefined) {
        updates.push("completed = ?");
        values.push(fields.completed);
    }
    // If no fields to update, return early
    if (updates.length === 0) {
        // No fields to update
        return Promise.resolve(0);
    }
    // Return a promise that resolves when the update is complete
    return new Promise((resolve, reject) => {
        const sql = `
        UPDATE tasks 
        SET ${updates.join(", ")} 
        WHERE id = ?
        `;
        // Add the task ID to the parameters array
        values.push(id);
        // Execute the update query
        db.run(
            sql,
            values,
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            }
        );
    });
}   

// Function to delete a task by ID
function deleteTask(id) {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM tasks WHERE id = ?";   
        db.run(
            sql,
            [id],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    // Return the number of rows affected
                    resolve(this.changes);
                }
            }
        );
    });
}   

// Export the database connection for use in other modules
module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};