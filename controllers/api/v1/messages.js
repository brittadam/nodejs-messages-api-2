// require the Message model
const Message = require("../../../models/Message");

const index = async (req, res) => {
    let messages = await Message.find({});
    res.json({
        status: "success",
        message: "GET all messages",
        data: [
            {
                messages: messages,
            },
        ],
    });
};

const create = async (req, res) => {
    let message = req.body.message;
    let m = new Message();
    m.message = message;
    m.id = 911; 
    await m.save();

    res.json({
        status: "success",
        message: "POST a new message",
        data: [
            {
                message: m.message,
                id: m.id,
            },
        ],
    });
};

const getMessageById = async (req, res) => {
    let id = req.params.id;
    let message = await Message.find({id:id});
    res.json({
        status: "success",
        message: "GET a message by ID",
        data: [
            {
                message: message,
            },
        ],
    });
};

module.exports.index = index;
module.exports.create = create;
module.exports.getMessageById = getMessageById;
