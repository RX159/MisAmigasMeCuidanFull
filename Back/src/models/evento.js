const validator = require('validator')
const mongoose = require('mongoose')

const eventoSchema = mongoose.Schema({
	  titulo: {
		type: String,
		required: true
	  },
	  horaI: {
		type: String,
		required: true
	  },
	  horaF: {
		type: String,
		required: true
	  },
	  descripcion: {
		type: String,
		required: true
	  },
	  fecha: {
		type: String,
		default: false
	  },
	  lugarInicial: {
		type: String,
		default: false
	  },
	  lugarFinal: {
		type: String,
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