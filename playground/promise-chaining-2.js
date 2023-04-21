require('../src/db/mongoose')
var Task = require('../src/models/task')

/*Task.findByIdAndDelete('64313cff9c1ebae8e04bf122').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then((incompletetasks) => {
    console.log(incompletetasks)
}).catch((error) => {
    console.log(error)
})*/

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('64313cef9c1ebae8e04bf121').then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})