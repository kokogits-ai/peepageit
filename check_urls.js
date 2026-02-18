const https = require('https');

const urls = [
    "https://reliable-firm.netlify.app/pix.jpeg",
    "https://reliable-firm.netlify.app/nort.png",
    "https://logo.clearbit.com/gmail.com"
];

urls.forEach(url => {
    https.get(url, (res) => {
        console.log(`${url}: ${res.statusCode}`);
    }).on('error', (e) => {
        console.error(`${url}: Error ${e.message}`);
    });
});
