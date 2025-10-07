import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    modeID: {
        type: Number,
        require: true
    },
    points: {
        type: Number,
        default: 0
    },
    victories: {
        type: Number,
        default: 0
    },
    played: {
        type: Number,
        default: 0
    },
})
export default mongoose.models.data || mongoose.model('data', dataSchema)