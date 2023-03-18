const request = require('supertest')('http://localhost:8080')
const expect = require('chai').expect
const generador = require('../generador/usuarios')

describe('test api rest full', () => {
    describe('GET', () => {
        it('it should return a status 200', async () => {
            let response = await request.get('/api')
            expect(response.status).to.eql(200)
        })
    })

    describe('POST', () => {
        it('should add an user', async () => {

            let usuario = generador.get()

            let response = await request.post('/api').send(usuario)
            expect(response.status).to.eql(200)

            const user = response.body
            expect(user).to.include.keys('nombre','email')
            expect(user.nombre).to.eql(usuario.nombre)
            expect(user.email).to.equal(usuario.email)
        })
    })
})
