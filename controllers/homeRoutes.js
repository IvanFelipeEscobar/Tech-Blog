const router = require('express').Router()
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models')
//route to populate homepage with existing post
router.get(`/`, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
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
        const posts = dbPostData.map((post) => post.get({ plain: true }))
        res.render(`homepage`, { posts,
            loggedIn: req.session.loggedIn })
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//login route
router.get(`/login`, (req, res) =>{
    req.session.loggedIn?
        res.redirect(`/`) :
        res.render(`login`)
})
//signup route
router.get(`/signup`, (req, res) =>{
    req.session.loggedIn?
        res.redirect(`/`) :
        res.render(`signup`)
})

//single post route
router.get(`/post/:id`, async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
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
        if(!dbPostData){
            res.status(404).json({message: `no post found`})
        }
        const post = dbPostData.get({ plain: true })
        
        res.render(`singlePost`, {post,
        loggedIn: req.session.loggedIn})
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})


module.exports = router