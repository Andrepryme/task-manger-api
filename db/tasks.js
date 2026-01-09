const { pool } = require('./database');

// Function to create a new task
async function createTask(title, user_id) {
    const sql = "INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING id, title";
    const result = await pool.query(sql, [title, user_id]);
    return result.rows[0];
}

// Function to get a task by ID
async function getTaskById(id, user_id) {
    const sql = "SELECT * FROM tasks WHERE id = $1 AND user_id = $2";
    const result = await pool.query(sql, [id, user_id]);
    return result.rows[0] || null;
}

// Function to get all tasks
async function getAllTasks(user_id) {
    const sql = "SELECT * FROM tasks WHERE user_id = $1";
    const result = await pool.query(sql, [user_id]);
    return result.rows[0] || null;
}

async function updateTask(id, fields, user_id) {
    // Build the SQL query dynamically based on provided fields
    const updates = [];
    // Parameters array for the SQL query
    const values = [];
    // paramIndex tracks placeholder
    let paramIndex = 1;

    // Only update the title if it's provided
    if (fields.title !== undefined) {
        updates.push(`title = $${paramIndex}`);
        values.push(fields.title);
        paramIndex++;
    }
    // Only update the completed status if it's provided
    if (fields.completed !== undefined) {
        updates.push(`completed = $${paramIndex}`);
        values.push(fields.completed);
        paramIndex++;
    }
    // If no fields to update, return early
    if (updates.length === 0) {
        return null;
    }
    const sql = `
        UPDATE tasks
        SET ${updates.join(', ')}
        WHERE id = $${paramIndex}
        AND user_id = $${paramIndex + 1}
        RETURNING *;
    `;
    // Add the task ID and user ID to the parameters array
    values.push(id, user_id);
    const result = await pool.query(sql, values);
    return result.rows[0] || null;
}   

// Function to delete a task by ID
async function deleteTask(id, user_id) {
    const sql = "DELETE FROM tasks WHERE id = $1 AND user_id = $2";
    const result = await pool.query(sql, [id, user_id]);
    return result.rows[0] || null; 
}   

// Export the database connection for use in other modules
module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};