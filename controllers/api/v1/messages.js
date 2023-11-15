// require the Message model
const Message = require("../../../models/Message");

const index = async (req, res) => {
    let username = req.query.username;
    if(username){
        let messages = await Message.find({ username: username });

        res.json({
            status: "success",
            message: `GET a message by username ${username}`,
            data: messages,
        });
    }
    else { 
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
};

const create = async (req, res) => {
    let message = req.body.message;
    let m = new Message();
    m.message = message;
    m.id = 911; 
    m.username = "pikachu";
    await m.save();

    res.json({
        status: "success",
        message: "POST a new message",
        data: [
            {
                message: m.message,
                id: m.id,
                username: m.username,
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

const deleteMessageById = async (req, res) => {
    let id = req.params.id;
    let message = await Message.deleteOne({id:id});
    res.json({
        status: "success",
        message: "The message was removed",
        data: [
            {
                message: message,
            },
        ],
    });
};

const putMessageById = async (req, res) => {
    let id = req.params.id;

    let message = await Message.findOne({ id: id });
    message.message = req.body.message;

    await message.save();

    res.json({
        status: "success",
        message: "The message was updated",
        data: [
            {
                message: message.message,
            },
        ],
    });
};


module.exports.index = index;
module.exports.create = create;
module.exports.getMessageById = getMessageById;
module.exports.deleteMessageById = deleteMessageById;
module.exports.putMessageById = putMessageById;

