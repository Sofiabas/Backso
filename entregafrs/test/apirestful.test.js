/*Siguiendo ejemplo de diapositiva:*/

const request = require(`supertest`)(`http://localhost:8315/test/productos`);
const expect = require(`chai`).expect;

describe(`Test apirestful - productos`, () => {
    describe(`GET / `, () => {
        it(`Debería mostrar status 200`, async () => {
            const response = await request.get(`/`);
               console.log(response.status)
               console.log(response.body)

            expect(response.status).to.eql(200);
        });

        it(`Debería retornar un array`, async () => {
            const response = await request.get(`/`);

            expect(typeof response._body).to.eql(`object`);
        });
    });

    // describe(`POST /`, () => {
    //     it(`Debería agregar un producto`, async () => {
    //         const response = await request.post(`/`).send({
    //             nombre: `perfume desde supertest / chai`,
    //             precio: 12340,
    //             thumbnail: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpiHylv1gJeLH8QHKWECa7dDx1KWwvOfMuPi5QB5wbJI3WYJf5NGvXBOHe1yr2zRgqZHo&usqp=CAU`,
    //             descripcion: `descripción desde supertest / chai 26enero`,
    //             timestamp: new Date().toDateString(),
    //             codigo: 0303456,
    //             stock: 3,
    //             cantidad: 0
    //         });

    //         expect(response.status).to.eql(201);
    //     });
    // });

    // describe(`DELETE / `, () => {

    //     it(`Debería borrar un producto`, async () => {//Colocar id a borrar 
    //         const response = await request.delete(`/63d299ed1267a964b4f63d28`);

    //         expect(response.status).to.eql(200);
    //     });
    // });

})
