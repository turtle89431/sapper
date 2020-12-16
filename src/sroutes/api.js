const express = require("express")
const api = express.Router()
api.get("/", (req, res) => {
    res.json({ example: "example api" })
})
module.exports = api