import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    mail: {
        type: String,
        required: [true,"Email is required"],
        unique: [true, "Email exists"],
        validate: {
            validator: (value) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
            },
            message: "Invalid email",
        }
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: [true, "Name exist"],
        validate: {
            validator: (value) => {
                return /^[a-zA-Z0-9]{4,}$/.test(value)
            },
            message: "Invalid name"
        }
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    },
})

export default mongoose.models.users || mongoose.model('users',userSchema)