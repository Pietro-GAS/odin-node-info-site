import http from 'node:http';
import EventEmitter from 'node:events';
import fs from 'node:fs/promises';

const eventEmitter = new EventEmitter();
eventEmitter.on('start', () => {
    //console.log('started');
    server.listen(8000);
});

const server = http.createServer();
server.on('request', (request, response) => {
    //console.log(request.method);
    //console.log(request.url);
    if (request.method === 'GET') {
        let body = [];
        request
            .on('error', err => {
                console.error(err);
            })
            .on('data', chunk => {
                body.push(chunk)
            })
            .on('end', () => {
                response.setHeader('Content-Type', 'text/html');
                const validUrls = ["/", "/about", "/contact-me"];
                if (validUrls.includes(request.url)) {
                    response.statusCode = 200;
                    responseBody(request.url, response);
                } else {
                    response.statusCode = 404;
                    response.end();
                }
            });
    } else {
        response.statusCode = 404;
        response.end();
    }
});

async function responseBody(url, response) {
    try {
        let filePath;
        switch (url) {
            case '/':
                filePath = './index.html';
                break;
            case '/about':
                filePath = './about.html';
                break;
            case '/contact-me':
                filePath = './contact-me.html';
                break;
            default:
                filePath = './404.html';
        }
        const data = await fs.readFile(filePath, { encoding: 'utf8' });
        response.end(data);
    } catch (err) {
        console.error(err);
    }
}

const main = () => {
    eventEmitter.emit('start');
}

main();