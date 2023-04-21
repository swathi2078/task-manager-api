const express = require('express')
const multer = require('multer')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const sharp = require('sharp')
const { sendWelcomeEmail,sendDeleteEmail } = require('../emails/account')

router.post('/users', async (req, res) => {

    const user = new User(req.body)
    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })

    try {
        await user.save()
        sendWelcomeEmail(user.email,user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {

        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        // res.send({ user: user.getPublicProfile(), token })
        res.send({ user, token })

    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })

    // try {
    //     const users = await User.find({})
    //     res.status(200).send(users)
    // } catch (e) {
    //     res.status(500).send(e)
    // }

    res.send(req.user)

})

// router.get('/users/:id', async (req, res) => {

//     const _id = req.params.id
// User.findById(_id).then((user) => {
//     if (!user) {
//         return res.status(404).send('No user found')
//     }
//     res.send(user)
// }).catch((error) => {
//     res.status(500).send(error)
// })

//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send('No user found')
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedupdates = ['name', 'email', 'password', 'age']
    const isValid = updates.every((update) => allowedupdates.includes(update))

    if (!isValid) {
        return res.status(400).send('{error:Invalid updates}')
    }
    // const _id = req.params.id
    try {
        // const user = await User.findById(req.user._id)

        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()


        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

        // if (!user) {
        //     return res.status(404).send()
        // }

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if (!user) {
        //     return res.status(404).send('{error:invalid user id to delete}')
        // }
        await req.user.remove()
        sendDeleteEmail(req.user.email,req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload image file of format jpg/jpeg/png'))
        }
        cb('', true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
   try{
       const user=await User.findById(req.params.id)

       if(!user || !user.avatar){
           return new Error()
       }

       res.set('Content-Type','image/png')
       res.send(user.avatar)
   }catch(e){
       res.status(404).send()
   }
})

module.exports = router