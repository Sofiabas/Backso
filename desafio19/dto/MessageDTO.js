class MessageDTO {
    constructor(message) {
        this.author = message.author.id
        this.text = message.text.mensaje
    }
};

module.exports = MessageDTO;