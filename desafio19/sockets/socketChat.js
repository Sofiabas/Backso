const MessageDAOMongoDB = require(`../daos/MessageDAOMongoDB`);
const mongoose = require('mongoose');

const storageMessages = new MessageDAOMongoDB();
let users = [];

const socketIoChat = (io) => {
    io.on(`connection`, socket => {
        
        socket.on(`joinChat`, async ({ aliasName }) => {
            users.push({
                id: socket.id,
                aliasName: aliasName,
                avatar: "https://as1.ftcdn.net/v2/jpg/05/61/97/48/1000_F_561974820_4sCD0xd60q0hfZGVYITXoHsur3AGA60Q.jpg"
            });

            socket.emit(`notification`, `Bienvenido ${aliasName}`);

            const allMessageFromDB = await storageMessages.getAll();

            socket.emit(`allMenssage`, allMessageFromDB);

            socket.broadcast.emit(`notification`, `${aliasName} se ha unido al chat`);

            io.sockets.emit(`users`, users);
        });

        socket.on(`messageInput`, async data => {
            const user = users.find(user => user.id === socket.id);

            const newMessage = {
                author: {
                    id: user.aliasName,
                    nombre: `Hard-code: Nombre del usuario`,
                    apellido: `Hard-code: Apellido del usuario`,
                    edad: `Hard-code: Edad`,
                    alias: `Hard-code: alias del usuario`,
                    avatar: `Hard-code: url avatar`
                },
                text: {
                    id: mongoose.Types.ObjectId(),
                    mensaje: data,
                }
            }

            await storageMessages.save(newMessage);

            socket.emit(`message`, newMessage);

            socket.broadcast.emit(`message`, newMessage);
        });

        socket.on('disconnect', reason => {
            const user = users.find(user => user.id === socket.id);
            users = users.filter(user => user.id !== socket.id);

            if (user) {
                socket.broadcast.emit(`notification`, `${user.aliasName} se ha ido del chat`);
            }

            io.sockets.emit(`users`, users);
        });
    });

}

module.exports = socketIoChat;