const router = require(`express`).Router()
const sequelize = require(`../../config/connection`)
const { User, Post, Comment } = require(`../../models`)
const withAuth = require(`../../utils/auth`)

router.get(`/`, async (req, res) => {
    try {
        const dbPost = await Post.findAll({
            attributes: [`id`, `post_title`, `post_content`, `created_at`],
            order: [['created_at', 'DESC']],
            include:[ {
                model:User,
                attributes: `name`
            },
            {
                model: Comment,
                attributes: [`id`, `user_id`, `post_id`, `comment_content`, `created_at`],
                include: {
                    model: User,
                    attributes: `name`
                }
            }]
        })
        res.json(dbPost)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get(`/:id`, async (req, res) => {
    try {
        const dbPostByID = await Post.findOne({
            where:{
                id: req.params.id
            },
            attributes: [`id`, `post_title`, `post_content`, `created_at`],
            order: [['created_at', 'DESC']],
            include:[ {
                model: User,
                attributes: `name`
            },
            {
                model: Comment,
                attributes: [`id`, `user_id`, `post_id`, `comment_content`, `created_at`],
                include: {
                    model: User,
                    attributes: `name`
                }
            }]
        })
        if(dbPostByID){
            res.status(500).json({message: `post not found`})
        }
        res.json(dbPostByID)

    } catch (err) {
        res.status(500).json(err)
    }
})

