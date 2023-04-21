require('../src/db/mongoose')
const User = require('../src/models/user')

/*User.findByIdAndUpdate('642f92c8deb6b8e70e2abd21', { age: 1 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})*/

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('642f92c8deb6b8e70e2abd21', 2).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})