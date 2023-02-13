const { Post } = require(`../models`)
const posts = [ 
    {
    post_title:`new tech`,
    post_content: `new tech is old news, old tech is no news`,
    user_id: 2
},
{
    post_title:`techno-vival`,
    post_content: `im a tech revival rival, so dont tell me i dont do tech`,
    user_id: 1
},
{
    post_title:`cool tech`,
    post_content: `today i saw some new tech and i thought it was super cool!`,
    user_id: 4
},{
    post_title:`super tech`,
    post_content: `with the arrival of super tech, say goodbye to your old non super tech`,
    user_id: 2
},{
    post_title:`tech is bad`,
    post_content: `i tried some tech today, it was bad`,
    user_id: 3
},{
    post_title:`yay! technology!`,
    post_content: `technology is fun`,
    user_id: 1
},
]
 const postSeed = () => Post.bulkCreate(posts)
 module.exports = postSeed