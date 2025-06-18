const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8000;

// MIME type mapping
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    // Handle root path
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);
    
    // Get file extension
    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    // Read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found, return 404
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`
<!DOCTYPE html>
<html>
<head>
    <title>404 - File Not Found</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        h1 { color: #e74c3c; }
    </style>
</head>
<body>
    <h1>404 - File Not Found</h1>
    <p>The requested file <strong>${req.url}</strong> was not found.</p>
    <a href="/">Go back to homepage</a>
</body>
</html>
                `);
            } else {
                // Server error
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 - Internal Server Error');
            }
        } else {
            // Successfully read file
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            });
            res.end(content);
        }
    });
});

server.listen(port, () => {
    console.log(`🚀 Server started!`);
    console.log(`📱 Local access: http://localhost:${port}`);
    console.log(`🌐 Network access: http://127.0.0.1:${port}`);
    console.log(`⏹️  Stop server: Ctrl+C`);
    console.log('');
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${port} is already in use, please try another port`);
    } else {
        console.error('❌ Server failed to start:', err);
    }
}); 