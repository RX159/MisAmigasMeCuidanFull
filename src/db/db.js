const mongoose = require('mongoose')
const connectionURL = 'mongodb+srv://admin:admin@cluster0-ipmka.mongodb.net/MAMC?retryWrites=true&w=majority'

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,     // crear indexes
  useUnifiedTopology: true,
  useFindAndModify: false
})