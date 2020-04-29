const User = require('../models/user')

const createUser = function(req, res){
  const user = new User(req.body)
  user.save().then(function() {
    return res.send(user)
  }).catch(function(error) {
    return res.status(400).send(error)
  })
}

const login = function(req, res) {
  console.log(req.body)
  User.findByCredentials(req.body.email, req.body.password).then(function(user){
    user.generateToken().then(function(token){
      return res.send({user, token})
    }).catch(function(error){
      return res.status(401).send({ error: error })
    })
  }).catch(function(error) {
    return res.status(401).send({ error: error })
  })
}

const logout = function(req, res) {
  req.user.tokens = req.user.tokens.filter(function(token) {
    return token.token !== req.token
  })
  req.user.save().then(function() {
    return res.send()
  }).catch(function(error) {
    return res.status(500).send({ error: error } )
  })
}

//Todavia no jala, no podemos probarlo, hasta tener vista de admin
const validateUser = function(req, res) {
  
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['validado']
  // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if( !isValidUpdate ) { //debemos proteger editar con auth
    return res.status(400).send({
      error: 'Invalid update, only allowed to update: ' + allowedUpdates
    })
  }
  User.findByIdAndUpdate(_id, req.body ).then(function(user) {
    if (!user) {
      return res.status(404).send({})
    }
    return res.send(user)
  }).catch(function(error) {
    res.status(500).send({ error })
  })

}

const getUsers = function(req, res) {
  User.find({}).then(function(user) {
    res.send(user)
  }).catch(function(error){
    res.status(500).send({ error })
  })
}



module.exports = {
  login: login,
  logout: logout,
  createUser : createUser,
  validateUser : validateUser,
  getUsers : getUsers
}