import {Router} from 'express'
import { Request, Response } from 'express'

const router= Router()
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express Account' })
})


export default router
