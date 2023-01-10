const passport = require('passport')
const sendEmail = require(`../utils/nodemailer.js`)

const dotenv = require(`dotenv`)
dotenv.config()

const LocalStrategy = require('passport-local').Strategy
const UserModel = require(`../dataBase/models/user`)

const { createHash } = require('../utils/utils')

const signup = () => {
  passport.use(
    'signup',
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const user = await UserModel.findOne({ username })
          if (user) {
            return done(null, false)
          }

          const newUser = new UserModel()
          newUser.username = username
          newUser.password = createHash(password)
          newUser.email = req.body.email
          newUser.telefono = req.body.tel
          newUser.edad = req.body.edad
          newUser.direccion = req.body.direccion
          newUser.foto = req.file.filename
          newUser.carrito = []
          newUser.admin = false

          const mailOptions = {
            from: process.env.EMAIL,
            to: `almadebudin23@hotmail.com`,
            subject: `Nuevo registro`,
            html: `
                    <h3>Nuevo registro de usuario!</h3>
                    <p> Datos:</p>
                    <ul>
                    <li> Nombre: ${newUser.username}</li>
                    <li> Email: ${newUser.email}</li>
                    <li> Teléfono: ${newUser.telefono}</li>
                    <li> Edad: ${newUser.edad}</li>
                    <li> Direccion: ${newUser.direccion}</li>
                    </ul>
                `,
          }

          const userSave = await newUser.save()

          const email = await sendEmail(mailOptions)

          return done(null, userSave)
        } catch (err) {
          loggerArchiveError.error(err)
          done(err)
        }
      },
    ),
  )
}

module.exports = signup
