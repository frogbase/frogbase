const pool = require("../config");

const getAllPostsDb = async (page, limit, filter) => {
    const offset = (page - 1) * limit;

    let whereClause = '';
    let filterParam = '';

    if (filter) {
        whereClause = `
            WHERE
                posts.title ILIKE $3 OR
                posts.description ILIKE $3 OR
                users_creator.username ILIKE $3 OR
                users_creator.name ILIKE $3 OR
                users_creator.email ILIKE $3 OR
                (users_updator.username ILIKE $3 AND users_updator.username IS NOT NULL) OR
                (users_updator.name ILIKE $3 AND users_updator.name IS NOT NULL) OR
                (users_updator.email ILIKE $3 AND users_updator.email IS NOT NULL)
        `;
        filterParam = `%${filter}%`;
    }

    const queryString = `
        SELECT
            posts.id,
            posts.title,
            posts.description,
            posts.image,
            json_build_object(
                'id', users_creator.id,
                'username', users_creator.username,
                'email', users_creator.email,
                'password', users_creator.password,
                'name', users_creator.name,
                'avatar', users_creator.avatar,
                'created', users_creator.created,
                'updated', users_creator.updated
            ) AS creator,
            CASE
                WHEN posts.updator IS NOT NULL THEN
                    json_build_object(
                        'id', users_updator.id,
                        'username', users_updator.username,
                        'email', users_updator.email,
                        'password', users_updator.password,
                        'name', users_updator.name,
                        'avatar', users_updator.avatar,
                        'created', users_updator.created,
                        'updated', users_updator.updated
                    )
                ELSE
                    NULL
            END AS updator,
            posts.created,
            posts.updated
        FROM
            public.posts
        JOIN
            public.users AS users_creator ON posts.creator = users_creator.id
        LEFT JOIN
            public.users AS users_updator ON posts.updator = users_updator.id
        ${whereClause}
        ORDER BY posts.created DESC
        LIMIT $1 OFFSET $2
    `;

    const queryParams = filter ? [limit, offset, filterParam] : [limit, offset];

    const { rows: posts } = await pool.query(queryString, queryParams);
    return posts;
};

const createPostDb = async ({ title, description, image, creator }) => {
    image = image || null;
    const { rows: posts } = await pool.query(
        `INSERT INTO posts(title, description, image, creator)
    VALUES($1, $2, $3, $4)
    returning *`,
        [title, description, image, creator.id],
    );
    return posts[0];
};

const getPostByIdDb = async (id) => {
    const { rows: posts } = await pool.query(
        `
        SELECT
            posts.id,
            posts.title,
            posts.description,
            posts.image,
            json_build_object(
                'id', users_creator.id,
                'username', users_creator.username,
                'email', users_creator.email,
                'password', users_creator.password,
                'name', users_creator.name,
                'avatar', users_creator.avatar,
                'created', users_creator.created,
                'updated', users_creator.updated
            ) AS creator,
            CASE
                WHEN posts.updator IS NOT NULL THEN
                    json_build_object(
                        'id', users_updator.id,
                        'username', users_updator.username,
                        'email', users_updator.email,
                        'password', users_updator.password,
                        'name', users_updator.name,
                        'avatar', users_updator.avatar,
                        'created', users_updator.created,
                        'updated', users_updator.updated
                    )
                ELSE
                    NULL
            END AS updator,
            posts.created,
            posts.updated
        FROM
            public.posts
        JOIN
            public.users AS users_creator ON posts.creator = users_creator.id
        LEFT JOIN
            public.users AS users_updator ON posts.updator = users_updator.id
        WHERE
            posts.id = $1;
        `,
        [id]);
    return posts[0];
};

const updatePostDb = async ({ id, title, description, image, updator }) => {
    const { rows: posts } = await pool.query(
        `UPDATE posts set title = $2, description = $3, image = $4, updator = $5
    WHERE id = $1
    RETURNING *`,
        [id, title, description, image, updator.id],
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
