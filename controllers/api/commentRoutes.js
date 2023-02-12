const router = require(`express`).Router()
const sequelize = require(`../../config/connection`)
const { Comment } = require(`../../models`)
const withAuth = require(`../../utils/auth`)
//api/comments
router.get(`/`, withAuth, async (req, res) => {
    try {
       const dbCommentData = await Comment.findAll()
       res.json(dbCommentData)
    } catch (err) {
        res.status(500).json(err)
    }
})
router.get(`/:id`, withAuth, async (req, res) => {
    try {
        const dbCommentByID = await Comment.findOne({
            where: {
                id: req.params.id
            }
        })
        if(!dbCommentByID){
            res.status(404).json({message: `comment not found`})
        }
        res.json(dbCommentByID)
    } catch (err) {
        res.status(500).json(err)
    }
})
router.post(`/`, withAuth, async (req, res) => {
    try {
        const dbCreateComment = await Comment.create({
            
                comment_content: req.body.comment_content,
                post_id: req.body.post_id,
                user_id: req.session.user_id
            
        })
        res.json(dbCreateComment)
    } catch (err) {
        res.status(500).json(err)
    }
})
router.put(`/:id`, withAuth, async (req, res)=> {
    try {
        const dbUpdateComment = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
            })
            if(!dbUpdateComment){
                res.status(404).json({message: `comment not found`})
            }
            res.json(dbUpdateComment)
    } catch (err) {
        res.status(500).json(err)
    }
})
router.delete(`/:id`, withAuth, async (req, res)=> {
    try {
        const dbCommentDelete = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        if(!dbCommentDelete){
            res.status(404).json({message: `comment not found`})
        }
        res.json(dbCommentDelete)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router