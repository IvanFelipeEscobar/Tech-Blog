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
        const posts = dbPostData.map(post => post.get({ plain: true }))
        res.render(`home`, {posts,
        login: req.session.login})
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//login route
router.get(`/login`, (req, res) =>{
    if(req.session.login){
        res.redirect(`/`)
        return
    }
    res.render(`login`)
})
//signup route
router.get(`/signup`, (req, res) =>{
    if(req.session.login){
        res.redirect(`/`)
        return
    }
    res.render(`signup`)
})

//single post route
router.get(`/post/:id`, async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: {
                id: req.params.id
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
        const post = dbPostData.map(post => post.get({ plain: true }))
        res.render(`singlePost`, {post,
        login: req.session.login})
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})


module.exports = router