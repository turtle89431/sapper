const express = require('express')
const sapper = require("@sapper/server")
const app = express();
const compression = require("compression")
const sirv = require("sirv")
const port = 3000
const {
    PORT = 3000,
        BASE_URL = 'http://localhost:3000',
        NODE_ENV = 'development',
        OAUTH_ISSUER_BASE_URL = 'https://your.auth0.com',
        OAUTH_CLIENT_ID="your oauth client id',
        OAUTH_CLIENT_SECRET = "your secert" // Must be provided by env; DO NOT CHECK IN
} = process.env
const dev = NODE_ENV === 'development';
const sroutes = require("./sroutes/api") // <-- express server routes
const { auth, requiresAuth } = require('express-openid-connect')

app.use(compression({ threshold: 0 }));
//your middleware begin
app.use(auth({
    authRequired: false,
    auth0Logout: true,
    baseURL: BASE_URL,
    issuerBaseURL: OAUTH_ISSUER_BASE_URL,
    clientID: OAUTH_CLIENT_ID,
    secret: OAUTH_CLIENT_SECRET

}))
app.use("/api", sroutes)

app.get('/test', requiresAuth(), (req, res, next) => {
    console.log(req.oidc)
    res.json(req.oidc.user)
})

//your middleware end
//sapper must go just before app.listen()
app.use(sirv('static', { dev }));

app.use((req, res, next) => {
    let myReq = (req.session) ? req.session : { session: { user: null } }
    return sapper.middleware({
        session: () => {
            return {
                user: req.oidc.user
            }
        }
    })(req, res, next)
});
app.listen(PORT, (err) => {
    if (err) console.log(err)
})
