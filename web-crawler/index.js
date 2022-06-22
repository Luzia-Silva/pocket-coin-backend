const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
console.log(__dirname+'crawler')
const crawler = require('./crawler')
const app = express()
const port = 3333
app.use(bodyParser.json())
app.use(cors())
app.get('/crawler', async (req, res) => {
    const response = await crawler.getNews(req.query.url || 'https://exame.com/noticias-sobre/moedas/')
    res.send(response)
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});