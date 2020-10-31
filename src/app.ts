// import { subscriptionCron } from './cron/sales/subscribers'

require('dotenv').config()
import express, {NextFunction, Request, Response} from 'express'

const createError = require('http-errors')
import cors = require('cors')

const debug = require('debug')('biztools:server')
const http = require('http')
// const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
import IndexRouter from './routes/index'

const app = express()

// view engine setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')
app.disable('x-powered-by')
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/', IndexRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err:any, req: Request, res:Response) {
  // set locals, only providing error in development
  res.locals.path = req.path
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

const port = normalizePort(process.env.PORT || '3002')
app.set('port', port)

const httpserver = http.createServer(app)

// server.installSubscriptionHandlers(httpserver)

httpserver.listen(port, () => {})
httpserver.on('error', onError)
httpserver.on('listening', onListening)

function normalizePort(val: any) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error
  }
  

  switch (error.code) {
    case 'EACCES':
      process.exit(1)
      break
    case 'EADDRINUSE':
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  const addr = httpserver.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}

// vcardcron.start()
