const router = require('express').Router()
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models')
const withAuth = require(`../utils/auth`)
//route to populate dashboard with existing user post
router.get(`/`, withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [`id`, `post_title`, `created_at`, `post_content`],
            include: [
                {
                    model: Comment,
                    attributes: [`id`, `comment_content`, `post_id`, `user_id`, `created_at`],
                    include: {
                        model: User,
                        attributes: [`name`]
                    }
                },
                {
                    model: User,
                    attributes: [`name`]
                }
            ]
        })
        const posts = dbPostData.map(post => post.get({ plain: true }))
        res.render(`dashboard`, {posts, loggedIn: req.session.loggedIn})
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//dashboard/edit/:id post route
router.get(`/edit/:id`, withAuth, async (req, res) => {
    try {
        const dbData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [`id`, `post_title`, `created_at`, `post_content`],
            include: [
                {
                    model: Comment,
                    attributes: [`id`, `comment_content`, `post_id`, `user_id`, `created_at`],
                    include: {
                        model: User,
                        attributes: [`name`]
                    }
                },
                {
                    model: User,
                    attributes: [`name`]
                }
            ]
        })
        if(!dbData){
            res.status(404).json({message: `no post found`})
        }
        const post = dbData.get({ plain: true })
        res.render(`editPost`, {post, loggedIn: req.session.loggedIn})
        
    } catch (err) {
        res.status(500).json(err)
        
    }
})
//dashboard/create post route
router.get(`/create`, withAuth, (req, res) => res.render(`createPost`, {loggedIn: req.session.loggedIn}))

module.exports = router