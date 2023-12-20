const pool = require("../config");

const getAllPostsDb = async () => {
    const { rows: posts } = await pool.query("SELECT * FROM posts");
    return posts;
};

const createPostDb = async ({ title, description, image }) => {
    image = image || null;
    const { rows: posts } = await pool.query(
        `INSERT INTO posts(title, description, image)
    VALUES($1, $2, $3)
    returning *`,
        [title, description, image],
    );
    return posts[0];
};

const getPostByIdDb = async (id) => {
    const { rows: posts } = await pool.query(`SELECT * FROM posts WHERE id = $1`, [id]);
    return posts[0];
};

const updatePostDb = async ({ id, title, description, image }) => {
    const { rows: posts } = await pool.query(
        `UPDATE posts set title = $2, description = $3, image = $4
    WHERE id = $1
    RETURNING *`,
        [id, title, description, image],
    );
    return posts[0];
};

const deletePostDb = async (id) => {
    const { rows: posts } = await pool.query(`DELETE FROM posts WHERE id = $1 RETURNING *`, [id]);
    return posts[0];
};

module.exports = {
    getAllPostsDb,
    getPostByIdDb,
    createPostDb,
    updatePostDb,
    deletePostDb,
};
