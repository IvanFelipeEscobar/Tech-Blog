const router = require('express').Router()
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models')
const withAuth = require(`../utils/auth`)
//route to populate homepage with existing post
router.get(`/`, withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [`id`, `title`, `created_at`, `post_content`],
            include: [
                {
                    model: Comment,
                    attributes: [`id`, `comment_content`, `post_id`, `user_id`, `created_at`],
                    include: {
                        model: User,
                        attributes: `name`
                    }
                },
                {
                    model: User,
                    attributes: `name`
                }
            ]
        })
        const posts = dbPostData.map(post => post.get({ plain: true }))
        res.render(`dashboard`, {posts,
        loggedIn: req.session.loggedIn})
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//
module.exports = router