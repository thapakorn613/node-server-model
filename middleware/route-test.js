const express = require('express')
module.exports = function (options = {}) {
    const router = express.Router()
    const { service } = options
    router.get('/test', async (req, res) => {
        try {
            const resData = await service.getTestData()
            res.send(resData);
        }catch (e) {console.log(e)}
    })
    return router
}