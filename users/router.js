const { Router } = require('express')
const User = require('./model')
const router = new Router()
const bcrypt = require('bcrypt-node')

const UserRepository = {
    idCounter: 0,
    users: [],
    create: function (user) {
        if (this.users.findIndex(u => u.email === user.email) >= 0) {
            return Promise.reject('E-mail address already in use')
        }
        user.id = ++this.idCounter
        this.users.push(user)
        return Promise.resolve({ ...user })
    },
    findByEmail: function (email) {
        return Promise.resolve(this.users.find(u => u.email === email))
    },
    deleteById: function (id) {
        const lengthBefore = this.users.length
        this.users = this.users.filter(u => u.id !== id)
        return Promise.resolve(lengthBefore - this.users.length)
    }
}

router.post('/users', (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send('An email and password are required')
    }
    // Replace provided password, with a hash
    const user = {
        ...req.body,
        password: bcrypt.hashSync(req.body.password)
    }
    UserRepository.create(user)
        .then(u => res.status(201).send({ ...u, password: undefined }))
        .catch(e => res.status(400).send(e))
})

router.post('/users', (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send('An email and password are required')
    }
    // Replace provided password, with a hash
    const user = {
        ...req.body,
        password: bcrypt.hashSync(req.body.password)
    }
    userRepository.create(user)
        .then(u => res.status(201).send({ ...u, password: undefined }))
        .catch(e => res.status(400).send(e))
})

// Log-in end-point
router.post('/logins', (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send('An email and password are required')
    } 
    userRepository.findByEmail(req.body.email)
        .then(dbUser => {
            if (dbUser && bcrypt.compareSync(req.body.password, dbUser.password)) {
                const token = jwt.sign({ id: dbUser.id }, secretKey)
                res.send({ token })
            } else {
                res.status(400).send('Incorrect email and password combination')
            }
        })
        .catch(e => next(e))
})

// A DELETE end-point that requires a token to identify the user
router.delete('/users/:id', authentication, (req, res, next) => {
    const idToDelete = parseInt(req.params.id)
    // Authorization check:
    // If current user's ID does not match the ID path param, 
    // then they are not allowed to delete the requested account.
    if (req.currentUserId !== idToDelete) {
        res.status(403).send('You do not have permission to perform this action')
    } else {
        userRepository.deleteById(idToDelete)
            .then(num => {
                if (num > 0) {
                    res.send('User account deleted')
                } else {
                    res.status(404).send('No such account')
                }
            })
            .catch(e => next(e))
    }
})

// Authentication middleware
function authentication(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('No authentication provided')
    }
    const [authType, token] = req.headers.authorization.split(' ')
    if (authType !== 'Bearer') {
        return res.status(400).send('Unsupported authorization type: ' + authType)
    }
    try {
        // make user ID available to next handlers
        req.currentUserId = jwt.verify(token, secretKey).id
        next()
    } catch (e) {
        // if verification fails, end the request
        console.error(e)
        return res.status(401).send('Invalid token')
    }
}



module.exports = router
