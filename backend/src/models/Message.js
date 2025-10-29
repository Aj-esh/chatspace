import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true,
    },
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
    },
    space : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'space',
        required : true,
    },
    timestamp : {
        type : Date,
        default : Date.now,
    },
})

export default mongoose.model('messages', messageSchema);