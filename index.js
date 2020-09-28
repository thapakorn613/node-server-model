require('dotenv').config();
const express = require('express')
const app = express()
const axios = require('axios')
const https = require('https')
const bodyParser = require('body-parser')
const userAuth = require('./storage/users.json')
const testMiddleware = require('./middleware/route-test.js')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

class GetDataBasic {
    constructor() {
        this.nameserver = "http://ronin-test.tlic.cmu.ac.th/"
    }
    async getTestData() {
        let getUrl = {
            "status":"true",
            "url": this.nameserver
        }
        return getUrl
    }
}

express().use((req, res, next) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    try {
        const auth = userAuth.find(u => u.username === username && u.password === password);
        if (username && password && username === auth.username && password === auth.password) {
            return next()
        }
    } catch (error) {
        res.set('WWW-Authenticate', 'Basic realm="401"')
        res.status(401).send('Authentication required.')
    }
})
    .use('/api', testMiddleware({
        service: new GetDataBasic(),
    }))
    .listen(process.env.PORT_RESTAPI_HTTPS, () => {
        console.log(`Server is running on port ${process.env.PORT_RESTAPI_HTTPS}.`);
    })
