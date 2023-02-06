import express from 'express' 
import expressLayouts from 'express-ejs-layouts'
import cookieParser from "cookie-parser"
import session from 'express-session'
//import passport from 'passport'
import flash from 'connect-flash'
import fileUpload from 'express-fileupload'
import db from './db.js'
import config from './app/config/auth.config.js'
import jwt from "jsonwebtoken";

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
app.set('layout', './UI/layout')
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)
//app.use(passport.initialize())
//app.use(passport.session())
app.use(flash())
app.use(fileUpload());


app.use((req,res, next)=>{
    
    app.locals.user = null
    
    let token = req.cookies["usr-auth"];
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
              app.locals.user = null
            }
            app.locals.user = decoded.user ? decoded.user : null;
        });
    }
    next()
})

import authRoutes from './app/routes/AuthRoutes.js'
import userRoutes from './app/routes/UserRoutes.js'

app.use(authRoutes)
app.use(userRoutes)







app.get('*', (req,res)=>{
    res.render('UI/404')
})

app.listen(port, ()=>{
    console.log(`The server is listening on port ${port}`)
})


