import http from 'http';
import fs from 'fs/promises';
import { extname, resolve } from 'path';
import dotenv from 'dotenv';
 
dotenv.config();
 
const server = http.createServer(async (req, res) => {
    let filePath = `.${req.url}`;
    if (filePath === './') {
        filePath = './index.html'; // Default file to serve
    }
 
    const contentType = getContentType(filePath);
 
    try {
        const content = await fs.readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf8');
    } catch (error) {
        if (error.code === 'ENOENT') {
            // Page not found
            try {
                const notFoundContent = await fs.readFile('./public/404.html');
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(notFoundContent, 'utf8');
            } catch (error) {
                res.writeHead(500);
                res.end('Server Error');
            }
        } else {
            // Server error
            res.writeHead(500);
            res.end('Server Error');
        }
    }
});
 
const PORT = process.env.PORT || 3000;
 
 
 
server.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/public/index.html`);
});
 
function getContentType(filePath) {
    const fileExtension = extname(filePath);
    switch (fileExtension) {
        case '.js':
            return 'text/javascript';
        case '.css':
            return 'text/css';
        case '.json':
            return 'application/json';
        case '.png':
            return 'image/png';
        case '.jpg':
            return 'image/jpg';
        default:
            return 'text/html';
    }
}