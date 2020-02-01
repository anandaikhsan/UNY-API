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

// router.get('/page/info', async function (req, res) {
//     rp('https://uny.ac.id/index-berita', (err, resp, content) => {
//         try{
//             const $ = cheerio.load(content);
//             console.log(err);
            
//             const firstIndex = 0;
//             const lastIndex = parseInt($('.pager-last.last a').attr('href').split('?')[1].split('=')[1]);
//             const totalPage = 1 + lastIndex;
//             const beritaPerPage = $('.view-berita .view-content table tr').length;
//             const result = {
//                 firstIndex, lastIndex, totalPage, beritaPerPage
//             };
//             res.json({status: 200, result});
//         }catch(err){
//             console.log(err.message);
//             res.status(500).json({
//                 status: 500,
//                 error: err.message
//             })
//         }
//     });
// });

router.get('/page/:pageNumber', async function (req, res) {
    rp('https://uny.ac.id/index-berita?page='+req.params.pageNumber, (err, resp, content) => {
        try{
            const $ = cheerio.load(content);

            const lastIndex = parseInt($('.pager-last.last a').attr('href').split('?')[1].split('page=')[1]);
            const totalPage = 1 + lastIndex;
            const beritaPerPage = $('.view-berita .view-content table tr .views-field-title').length;

            const results = [];
            $('.view-berita .view-content table tr').each((index, element) => {
                const title = $(element).find('td .views-field-title .field-content a').text();
                const summary = $(element).find('td .views-field-body .field-content p').text();
                const link = $(element).find('td .views-field-title .field-content a').attr('href');
                const content = null;
                const thumbnail = $(element).find('td .views-field-field-image .field-content img').attr('src');
                const featured_image = null;
                const created_date = $(element).find('td .views-field-created .field-content').text().split(': ')[1].split('\n')[0];
        
                results.push({
                    title, summary, link, content, thumbnail, created_date, featured_image
                });
            });
        
            res.json({
                status: 200,
                results,
                total_page: totalPage,
                first_index: 0,
                per_page: beritaPerPage
                });
        }catch(err){
            console.log(err.message);
            res.status(500).json({
                status: 500,
                error: err.message
            })
        }
    });
});

router.get('/open', async function(req, res){
    rp('https://uny.ac.id'+req.query.link, (err, resp, body) => {
        try{
            const $ = cheerio.load(body);

            const title = $('h1.title a').text();
            const summary = null;
            const thumbnail = null;
            const link = $('h1.title a').attr('href');
            const content = $('.content.node-article .field-item.even').text();
            const featured_image = $('.field-name-field-image img').attr('src');
            const submitted_date = $('#date-submitted');
            const created_date = $(submitted_date).find('.day').text() + " " + $(submitted_date).find('.month').text() + " " +  $(submitted_date).find('.year').text();

            const result = {
                title, summary, link, content, featured_image, created_date, thumbnail
            };

            res.json({status: 200, result});
        }catch(err){
            console.log(err.message);
            
            res.status(500).json({
                status: 500,
                error: err.message
            })
        }
    });
})

router.get('/search', async function (req, res) {
    rp('https://uny.ac.id/index-berita?title='+req.query.title+'&page='+req.query.page, (err, resp, content) => {
        try{
            const $ = cheerio.load(content);

            const lastIndex = parseInt($('.pager-last.last a').attr('href').split('?')[1].split('page=')[1]);
            const totalPage = 1 + lastIndex;
            const beritaPerPage = $('.view-berita .view-content table tr .views-field-title').length;

            const results = [];
            $('.view-berita .view-content table tr').each((index, element) => {
                const title = $(element).find('td .views-field-title .field-content a').text();
                const summary = $(element).find('td .views-field-body .field-content p').text();
                const link = $(element).find('td .views-field-title .field-content a').attr('href');
                const content = null;
                const thumbnail = $(element).find('td .views-field-field-image .field-content img').attr('src');
                const featured_image = null;
                const created_date = $(element).find('td .views-field-created .field-content').text().split(': ')[1].split('\n')[0];
                results.push({
                    title, summary, link, content, thumbnail, created_date, featured_image
                });
            });
        
            res.json({
                status: 200,
                results,
                total_page: totalPage,
                first_index: 0,
                per_page: beritaPerPage
            })
        }catch(err){
            console.log(err.message);
            res.status(500).json({
                status: 500,
                error: err.message
            })
        }
    });
});

module.exports = router;
