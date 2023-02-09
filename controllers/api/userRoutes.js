const router = require(`express`).Router()
const { User, Post, Comment } = require(`../../models`)
const withAuth = require(`../../utils/auth`)

router.get(`/`, async (req, res) => {
    try {
    const dbData = await User.findAll({
            attributes: { exclude: `password` }
        })
        res.json(dbData)

    } catch (err) {
        res.status(500).json(err)
    }
})

router.get(`/:id`, async (req,res) => {
    try {
        const dbByID = await User.findOne({
            attributes: {exclude: `password`},
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Post,
                    attributes: [`id`, `post_title`, `post_content`, `created_at`]
                },
                {
                    model: Comment,
                    attributes: [`id`, `comment_content`, `created_at`],
                    include: {
                        model: Post,
                        attributes: `post_title`
                    }
                }
            ]
        })
        if(!dbByID){
            res.status(404).json({message: `user not found`})
        }
        res.json(dbByID)
        
    } catch (err) { res.status(500).json(err)}
})

router.post(`/`, async (req, res) => {
   try {
    const dbUser = await  User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    req.session.save( () => {

        req.session.user_id = dbUser.id;
        req.session.username = dbUser.username;
        req.session.loggedIn = true;

    })
    
   } catch (err) {
    res.status(500).json(err)
   }
})

router.post(`/login`, async (req, res) => {
     try {
        const userLogin = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if(!userLogin){res.status(404).json({message: `user not found`})}
        const verifyPassword = userLogin.checkPassword(req.body.password)
        if(!verifyPassword){res.status(400).json({message: `Password is incorrect`})}
        req.session.save( () => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({user: userLogin, message: `you are now logged in`})
        })

     } catch (err) { res.status(500).json(err)}
})

router.post('/logout', (req, res) => {
    req.session.loggedIn?
        req.session.destroy(() => {res.status(204).end()}):   
        res.status(404).end();
    
})

router.put(`/:id`, withAuth, async (req, res) => {
    try {
        const dbUpdate = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        if(!dbUpdate){
            res.status(404).json({message: `user not found`})
        }
        res.json(dbUpdate)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete(`./:id`, withAuth, async (req, res) => {
    try {
        const dbDelete = await User.destroy({
            where: {
                id: req.params.id
            }
        })
        if(!dbDelete){
            res.status(404).json({message: `user not found`})
        }
        res.json(dbDelete)
        
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router