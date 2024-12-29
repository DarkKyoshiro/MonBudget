const mongoose = require("mongoose")

const accountSchema = mongoose.Schema({
    accountName: { type: String, required: true },
    type: { type: String, required: true },
    balance: { type: Number, required: false, default: 0 },
    dateCreated: { type: Number, required: true, default: Date.now() },
})

module.exports = mongoose.model("Account", accountSchema)
