var express = require('express');
var router = express.Router();
const rp = require('../../../utils/downloadContent');
const cheerio = require('cheerio');

router.get('/page/:pageNumber', async function (req, res) {
    rp('https://uny.ac.id/index-pengumuman?page='+req.params.pageNumber, (err, resp, content) => {
        try{
            const $ = cheerio.load(content);

            const lastIndex = parseInt($('.pager-last.last a').attr('href').split('?')[1].split('page=')[1]);
            const totalPage = 1 + lastIndex;
            const perPage = $('.view-berita .view-content table tr').length;

            const results = [];
            $('.view-berita .view-content table tr').each((index, element) => {
                const title = $(element).find('.views-field-title a').text();
                const link = $(element).find('.views-field-title a').attr('href');
                const created_date = $(element).find('.views-field-created').text().split('date:')[1];
                const attachment = null;
                results.push({
                    title, link, created_date, attachment
                });
            });
        
            res.json({
                status: 200,
                results,
                total_page: totalPage,
                per_page: perPage,
                first_index: 0
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


router.get('/open', async function (req, res) {
    rp('https://uny.ac.id'+req.query.link, (err, resp, content) => {
        try{
            const $ = cheerio.load(content);

            const title = $('h1.title a').text();
            const link = $('h1.title a').attr('href');
            const submitted_date = $('#date-submitted');
            const created_date = $(submitted_date).find('.day').text() + " " + $(submitted_date).find('.month').text() + " " +  $(submitted_date).find('.year').text();
            const attachment = $('.field-name-field-lampiran-pengumuman a').attr('href');
            
            const result = {title, link, created_date, attachment};
            res.json({
                status: 200,
                result
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


router.get('/search', async function (req, res) {
    rp('https://uny.ac.id/index-pengumuman?title='+req.query.title+'&page='+req.query.page, (err, resp, content) => {
        try{
            const $ = cheerio.load(content);

            const lastIndex = parseInt($('.pager-last.last a').attr('href').split('?')[1].split('page=')[1]);
            const totalPage = 1 + lastIndex;
            const perPage = $('.view-berita .view-content table tr').length;

            const results = [];
            $('.view-berita .view-content table tr').each((index, element) => {
                const title = $(element).find('.views-field-title a').text();
                const link = $(element).find('.views-field-title a').attr('href');
                const created_date = $(element).find('.views-field-created').text().split('date:')[1];
                const attachment = null;
                results.push({
                    title, link, created_date, attachment
                });
            });
        
            res.json({
                status: 200,
                results,
                total_page: totalPage,
                per_page: perPage,
                first_index: 0
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
