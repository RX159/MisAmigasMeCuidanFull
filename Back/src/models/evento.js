const validator = require('validator')
const mongoose = require('mongoose')

const eventoSchema = mongoose.Schema({
	  titulo: {
		type: String,
		required: true
	  },
	  hora: {
		type: String,
		required: true
	  },
	  duracion: {
		type: String,
		required: true
	  },
	  fecha: {
		type: String,
		default: false
	  },
	  lugarInicial: {
		type: Number,
		default: false
	  },
	  lugarFinal: {
		type: Number,
		default: false
	  },
	  involucradasCount: {
		type: Number,
		default: false
	  },
	  involucradas: [{
		type: mongoose.Schema.Types.ObjectId,
		default: false,
		ref:'User'
	  }],
	  creadoPor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	  }
})

const Evento = mongoose.model('Evento', eventoSchema)

module.exports = Evento