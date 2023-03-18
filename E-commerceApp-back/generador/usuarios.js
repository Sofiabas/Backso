const faker = require('faker')

const get = () => ({
    nombre: faker.name.firstname(),
    email: faker.internet.email()
})

module.exports = {
    get
}