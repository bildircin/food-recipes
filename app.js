import express from 'express' 
import expressLayouts from 'express-ejs-layouts'
import cookieParser from "cookie-parser"
import session from 'express-session'
//import passport from 'passport'
import flash from 'connect-flash'
import fileUpload from 'express-fileupload'
import db from './db.js'

const app = express()
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.static('public_admin'))
app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('layout', './layouts/layout')
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)
//app.use(passport.initialize())
//app.use(passport.session())
app.use(flash())
app.use(fileUpload());


import authRoutes from './app/routes/AuthRoutes.js'
import userRoutes from './app/routes/UserRoutes.js'

app.use(authRoutes)
app.use(userRoutes)






app.get('*', (req,res)=>{
    res.render('404')
})

app.listen(port, ()=>{
    console.log(`The server is listening on port ${port}`)
})


