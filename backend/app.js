const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const databaseName = "MonBudget"

const app = express()

mongoose
    .connect(
        "mongodb+srv://MonBudgetAdmin:zRVHpSjwxlWBc6QS@cluster0.tmhxw.mongodb.net/" +
            databaseName +
            "?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
        console.log("Connected to MongoDB database successfully!")
    })
    .catch(() => {
        console.log("Connection to MongoDB database failed!")
    })

const Account = require("./models/account")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    next()
})

app.post("/api/accounts", (req, res, next) => {
    const account = new Account({
        accountName: req.body.accountName,
        type: req.body.type,
        balance: req.body.balance,
        dateCreated: req.body.dateCreated,
    })
    account.save().then((accountSent) => {
        res.status(201).json({ message: "Account added successfully!", accountID: accountSent._id })
    })
})

app.get("/api/accounts", (req, res, next) => {
    Account.find().then((documents) => {
        res.status(200).json({
            message: "Accounts fetched successfully!",
            accounts: documents,
        })
    })
})

app.delete("/api/accounts/:id", (req, res, next) => {
    Account.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).json({ message: "Account deleted!" })
    })
})

module.exports = app
