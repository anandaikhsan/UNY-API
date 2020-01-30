var express = require('express');
var router = express.Router();
const rp = require('../../../utils/downloadContent');
const cheerio = require('cheerio');

router.get('/', async function(req, res) {
    const content = await rp('https://uny.ac.id/').catch((err) => {
        res.status(500).json({error: err.message});
    });
    const $ = cheerio.load(content);
    const result = {
        results: []
    };

    $('#block-views-berita-block-4 .views-row').each((index, element) => {
        const title = $(element).find('.views-field-title .field-content a').text();
        const summary = $(element).find('.views-field-body .field-content p').text();
        const link = $(element).find('.views-field-title .field-content a').attr('href');
        const content = null;
        const image = $(element).find('.views-field-image .field-content img').attr('src');
        const created_date = $(element).find('.views-field-created .field-content').text();


        result.results.push({
            title, summary, link, content, image, created_date
        });
    });

    await res.json({result});
});

module.exports = router;
