const db = require("./models/db.js")
const express = require("express")
const app = express()

console.log('DB SYNC.')

db.sync({
    alter: true,
    force: false
}).then(async () => {
    console.log('SYNC DONE.')
})

app.get("/", (req, res) => {
    return res.json({
        message: "Projet Artisan API."
    })
})

app.get("*", (req, res, next) => {
    console.log('GET ' + req.url)
    next()
})

app.post("*", (req, res, next) => {
    console.log('POST ' + req.url)
    next()
})

app.put("*", (req, res, next) => {
    console.log('PUT ' + req.url)
    next()
})

app.delete("*", (req, res, next) => {
    console.log('DELETE ' + req.url)
    next()
})

// require("fs").readdirSync(require("path").join(__dirname, "routes")).forEach(function (file) {
//     require("./routes/" + file)(app)
// })

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})