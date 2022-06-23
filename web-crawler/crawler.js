const axios = require("axios");
const jssoup = require('@aghajari/jssoup')
const Cache = require("node-cache");
const cache = new Cache();
const backupNews = require('./default')

class News {
    async getNews(url) {
        let response = cache.get("crawler");
        if (response) {
            // return response;
        }
        return this.refine(await this.html(url))
    }

    async html(url) {
        const res = await axios.get(url);
        return res.data;
    }

    refine(html) {
        const response = [];
        const news = jssoup.load(html).find('.palmeiras .E');
        for (let i = 0; i < news.length; i++) {
            const content = news[i].findFirst('.touch-area')
            response.push({title: content.plainText(), link: 'https://exame.com' + content.getValue('href')})
        }
        //cache.set("crawler", response, 10000);
        return response.length > 0 ? response : backupNews; 

    }
}

module.exports = new News()