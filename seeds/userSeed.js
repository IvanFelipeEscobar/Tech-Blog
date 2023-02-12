const { User } = require(`../models`)
const user =  [
    {
        name:`techyGuy`,
        email:`techGuy@tech.com`,
        password:`password1`
    },
    {
        name:`techNerd`,
        email:`techNerd@email.com`,
        password:`password2`
    },
    {
        name:`regularDude`,
        email:`regularJoe@email.com`,
        password:`password3`
    },
    {
        name:`blogMan`,
        email:`blogman@tech.com`,
        password:`password 4`
    },
]

const userSeed = () => User.bulkCreate(user)

module.exports = userSeed