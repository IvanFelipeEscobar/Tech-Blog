const { Comment } = require('../models');

const comment = [{
        comment_content: "i like new tech",
        user_id: 1,
        post_id: 1
    },
    {
        comment_content: "techno is not the same as tech bro",
        user_id: 2,
        post_id: 2
    },
    {
        comment_content: "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        user_id: 3,
        post_id: 3
    },
    {
        comment_content: "well i think that tech is good!",
        user_id: 1,
        post_id: 5
    }
];

const commentSeed = () => Comment.bulkCreate(comment);

module.exports = commentSeed;