const Evento = require('../models/evento.js')


//funcion para el feed de eventos
const getEventos = function(req, res) {
    Evento.find({}).then(function(eventos) {
      res.send(eventos)
    }).catch(function(error){
      res.status(500).send({ error })
    })
  }
  
  //funcion para obtener un evento en concreto con su ID
  const getEvento = function(req, res) {
    _id = req.params.id
    Evento.findById(_id).then(function(evento) {
      if ( !evento ) {
        return res.send({ error : 'Este evento no se ha encontrado!' })
      }
      return res.send(evento)
    }).catch(function(error) {
      return res.status(404).send({ error })
    })
  }
  
  //funcion para crear un nuevo evento
  const crearEvento = function(req, res) {
    const evento = new Evento({
      titulo: req.body.titulo,
      horaI: req.body.horaI,
      horaF: req.body.horaF,
      descripcion: req.body.descripcion,
      fecha: req.body.fecha,
      lugarInicial: req.body.lugarInicial,
      lugarFinal: req.body.lugarFinal,
      involucradasCount: req.body.involucradasCount,
      involucradas: req.body.involucradas,
      creadoPor: req.user._id
    })
    evento.save().then(function() {
      return res.send(evento)
    }).catch(function(error) {
      return res.status(400).send({ error })
    })
  }
  
  //funcion para modificar un evento en específico con el ID
  const updateEvento = function(req, res) {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['titulo', 'hora', 'duracion', 'fecha', 'lugarInicial', 'lugarFinal', 'involucradas', 'involucradasCount']
    // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
  
    if( !isValidUpdate ) {
      return res.status(400).send({
        error: 'Invalid update, only allowed to update: ' + allowedUpdates
      })
    }
    Evento.findByIdAndUpdate(_id, req.body ).then(function(evento) {
      if (!evento) {
        return res.status(404).send({})
      }
      return res.send(evento)
    }).catch(function(error) {
      res.status(500).send({ error })
    })
  }
  
  //funcion para borrar un evento en especifico del tendedero, se requiere el ID
  const deleteEvento = function(req, res) {
    const _id = req.params.id
    Evento.findByIdAndDelete(_id).then(function(evento){
      if(!evento) {
        return res.status(404).send({})
      }
      return res.send(evento)
    }).catch(function(error) {
      res.status(505).send({ error })
    })
  }
  
  module.exports = { 
    getEventos,
    getEvento,
    crearEvento,
    updateEvento,
    deleteEvento
  }