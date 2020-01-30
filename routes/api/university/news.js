var express = require('express');
var router = express.Router();
const rp = require('../../../utils/downloadContent');
const cheerio = require('cheerio');

// router.get('/', async function (req, res) {
//     const content = await rp('https://uny.ac.id/').catch((err) => {
//         res.status(500).json({error: err.message});
//     });
//     const $ = cheerio.load(content);
//     const result = {
//         results: []
//     };
//
//     $('#block-views-berita-block-4 .views-row').each((index, element) => {
//         const title = $(element).find('.views-field-title .field-content a').text();
//         const summary = $(element).find('.views-field-body .field-content p').text();
//         const link = $(element).find('.views-field-title .field-content a').attr('href');
//         const content = "";
//         const image = $(element).find('.views-field-image .field-content img').attr('src');
//         const created_date = $(element).find('.views-field-created .field-content').text();
//
//
//         result.results.push({
//             title, summary, link, content, image, created_date
//         });
//     });
//
//     await res.json({result});
// });

router.get('/page/info', async function (req, res) {
    const content = await rp('https://uny.ac.id/index-berita');
    const $ = cheerio.load(content);

    const firstIndex = 0;
    const lastIndex = parseInt($('.pager-last.last a').attr('href').split('?')[1].split('=')[1]);
    const totalPage = 1 + lastIndex;
    const beritaPerPage = $('.view-berita .view-content table tr').length;
    const result = {
        firstIndex, lastIndex, totalPage, beritaPerPage
    };

    await res.json({result});
});

router.get('/page/:pageNumber', async function (req, res) {
    const content = await rp('https://uny.ac.id/index-berita?page='+req.params.pageNumber);
    const $ = cheerio.load(content);
    const result = {
        results: []
    };
    $('.view-berita .view-content table tr').each((index, element) => {
        const title = $(element).find('td .views-field-title .field-content a').text();
        const summary = $(element).find('td .views-field-body .field-content p').text();
        const link = $(element).find('td .views-field-title .field-content a').attr('href');
        const content = null;
        const image = $(element).find('td .views-field-image .field-content img').attr('src');
        const created_date = $(element).find('td .views-field-created .field-content').text().split(': ')[1].split('\n')[0];

        result.results.push({
            title, summary, link, content, image, created_date
        });
    });

    await res.json({result})
});

router.get('/open', async function(req, res){
    const body = await rp('https://uny.ac.id/'+req.params.link);
    const $ = cheerio.load(body);

    const title = $('h1.title a').text();
    const summary = null;
    const link = $('h1.title a').attr('href');
    const content = $('.content.node-article .field-item.even').text();
    const image = $('.field-name-field-image img').attr('src');
    const submitted_date = $('#date-submitted');
    const created_date = $(submitted_date).find('.day').text() + $(submitted_date).find('.month').text() + $(submitted_date).find('.year').text();

    const result = {
        title, summary, link, content, image, created_date
    };

    await res.json({result});
})


module.exports = router;