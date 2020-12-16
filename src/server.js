const express = require('express')
const sapper = require("@sapper/server")
const app = express();
const compression = require("compression")
const sirv = require("sirv")
const port = 3000
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const sroutes = require("./sroutes/api") // <-- express server routes
app.use(compression({ threshold: 0 }));
//your middleware begin
app.use("/api", sroutes)
app.get('/test', (req, res, next) => {
        res.send("test")
    })
    //your middleware end
    //sapper must go just before app.listen()
app.use(sirv('static', { dev }));
app.use(sapper.middleware());
app.listen(PORT, (err) => {
    if (err) console.log(err)
})