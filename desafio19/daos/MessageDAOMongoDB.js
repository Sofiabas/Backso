const mongoDB = require(`../repository/options/mongoDB`);

const messageModel = require(`../repository/models/message`);

const ContenedorMessage = require(`../repository/container/ContainerMessage`);

class MessageDAOMongoDB extends ContenedorMessage {
    constructor() {
        super(mongoDB, messageModel);
    };
};

module.exports = MessageDAOMongoDB;