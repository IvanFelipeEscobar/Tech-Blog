const router = require('express').Router()
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models')
//route to populate homepage with existing post
router.get(`/`, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
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
        const postData = dbPostData.map(post => post.get({ plain: true }))
        res.render(`main`, {postData,
        loggedIn: req.session.loggedIn})
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})
module.exports = router
//login route

//signup route

//single post route