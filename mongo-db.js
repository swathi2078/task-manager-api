//CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID=mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to the database')
    }

    const db = client.db(databaseName)

    /* db.collection('users').insertOne({
         name: 'Vikram',
         age: 26
     }, (error, result) => {
         if (error) {
             return console.log('Unable to insert user')
         }
         console.log(result.ops)
     })
 
     db.collection('users').insertMany([
         {
             name:'Jen',
             age:28
         },
         {
             name:'Gunther',
             age:27
         }
     ], (error,result) => {
         if(error){
             return console.log('Unable to insert documents')
         }
         console.log(result.ops)
     })
 
     db.collection('tasks').insertMany([
         {
             description: 'Study Node',
             completed: false
         },
         {
             description: 'Find a bug',
             completed: true
         },
         {
             description: 'Read data structures',
             completed: false
         }
     ], (error, result) => {
         if (error) {
             return console.log('Unable to insert documents')
         }
         console.log(result.ops)
     })*/

    /*db.collection('users').findOne({ _id: ObjectID("642e11d7f93bf177d0439217") }, (error, user) => {
        if (error) {
            return console.log('Unable to fetch')
        }
        console.log(user)
    })*/

    /*db.collection('users').find({ age: 22 }).toArray((error,users)=>{
        console.log(users)
    })

    db.collection('users').find({ age: 22 }).count((error,count)=>{
        console.log(count)
    })*/

    /* db.collection('tasks').findOne({_id:new ObjectID("642dba24ec84d249a51b2613")},(error,task)=>{
         console.log(task)
     })
 
     db.collection('tasks').find({completed:false}).toArray((error,tasks)=>{
         console.log(tasks)
     })*/


    /*  const updatePromise = db.collection('users').updateOne({
          _id: new ObjectID("642db1de7efa473b383adef3")
      }, {
          $set: {
              name: 'Swetha'
          }
      })
  
      updatePromise.then((result) => {
          console.log(result)
      }).catch((error) => {
         console.log(error)
      })*/

    /* db.collection('users').updateOne({
         _id: new ObjectID("642db1de7efa473b383adef3")
     }, {
         $set: {
             name: 'Swetha'
         }
     }).then((result) => {
         console.log(result)
     }).catch((error) => {
        console.log(error)
     })*/

    /* db.collection('users').updateOne({
         _id: new ObjectID("642db1de7efa473b383adef3")
     }, {
         $inc: {
             age: 1
         }
     }).then((result) => {
         console.log(result)
     }).catch((error) => {
        console.log(error)
     })*/

    /*db.collection('users').updateMany({
        age: 22
    }, {
        $set: {
            age: 24
        }
    }).then((result) => {
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log(error)
    })*/

    /* db.collection('users').deleteMany({
         age: 24
     }).then((result) => {
         console.log(result)
     }).catch((error) => {
         console.log(error)
     })*/

    db.collection('tasks').deleteOne({
        description: 'Find a bug'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })


})