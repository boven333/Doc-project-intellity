// import express from "express";
// import fetch from "node-fetch";

// const router = express.Router();

// const chunkSize = 10 * 1024 * 1024; // 10 MB

// async function loadChunk(url, start, end) {
//     const response = await fetch(url, {
//         headers: {
//             'Range': `bytes=${start}-${end}`
//         }
//     });
//     if (response.status === 206 || response.status === 200) { // Partial Content or OK
//         return response.body; // Returning the response body directly
//     } else {
//         throw new Error(`Failed to load chunk: ${response.statusText}`);
//     }
// }

// router.get("/", async (req, res) => {
//     try {
//         const url = "https://examplefile.com/file-download/25";
//         const jsonData = url;
//         const response = await fetch(url, { method: 'HEAD' });
//         const totalSize = parseInt(response.headers.get('Content-Length'), 10);
//         res.set('Content-Type', 'application/octet-stream');
//         res.set('Content-Disposition', 'attachment; filename="file.txt"');

//         let currentPosition = 0;

//         while (currentPosition < totalSize) {
//             const end = Math.min(currentPosition + chunkSize - 1, totalSize - 1);
//             const chunk = await loadChunk(url, currentPosition, end);
//             currentPosition += chunkSize;
//             res.write(Buffer.from(await chunk.arrayBuffer())); // Writing the chunk to the response
//             console.log(`Loaded chunk: ${currentPosition} to ${end}`);
//         }

//         res.end(); // End the response after all chunks are sent
//         console.log('File loading complete', "JsonData", jsonData);
//     } catch (error) {
//         console.error('Error loading file:', error);
//         res.status(500).send({ error: "Error loading file" });
//     }
// });

// export default router;

// import express from "express";
// import fetch from "node-fetch";

// const router = express.Router();
// const chunkSize = 10 * 1024 * 1024; // 10 MB

// async function loadChunk(url, start, end) {
//     const response = await fetch(url, {
//         headers: {
//             'Range': `bytes=${start}-${end}`
//         }
//     });
//     if (response.status === 206 || response.status === 200) { // Partial Content or OK
//         return await response.text(); // Get text data to later parse it as JSON if needed
//     } else {
//         throw new Error(`Failed to load chunk: ${response.statusText}`);
//     }
// }

// async function loadFileInChunks(url, totalSize) {
//     let currentPosition = 0;
//     let jsonData = '';

//     while (currentPosition < totalSize) {
//         const end = Math.min(currentPosition + chunkSize - 1, totalSize - 1);
//         try {
//             const chunk = await loadChunk(url, currentPosition, end);
//             jsonData += chunk; // Concatenate chunk text data
//             currentPosition += chunkSize;
//             console.log(`Loaded chunk: ${currentPosition} to ${end}`);
//         } catch (error) {
//             console.error('Error loading chunk:', error);
//             break;
//         }
//     }

//     try {
//         console.log('Parsed JSON data:', jsonData);
//         // Process the parsed JSON data if needed
//     } catch (error) {
//         console.error('Error parsing JSON data:', error);
//     }

//     console.log('File loading complete');
// }

// router.get("/", async (req, res) => {
//     try {
//         const response = await fetch("https://examplefile.com/file-download/25", { method: 'HEAD' });
//         const totalSize = parseInt(response.headers.get('Content-Length'), 10);
//         await loadFileInChunks("https://examplefile.com/file-download/25", totalSize); // Await for the function to complete
//         res.status(200).send("Chunk Fetching Success");
//     } catch (error) {
//         res.status(500).send({ error: "Error Chunk fetching" });
//     }
// });

// export default router;

// import express from "express";
// import fetch from "node-fetch";

// const router = express.Router();
// const chunkSize = 10 * 1024 * 1024; // 10 MB

// async function loadChunk(res, url, start, end) {
//     const response = await fetch(url, {
//         headers: {
//             'Range': `bytes=${start}-${end}`
//         }
//     });
//     if (response.status === 206 || response.status === 200) { // Partial Content or OK
//         res.write(await response.buffer()); // Write chunk data directly to response stream
//     } else {
//         throw new Error(`Failed to load chunk: ${response.statusText}`);
//     }
// }

// async function loadFileInChunks(res, url, totalSize) {
//     let currentPosition = 0;

//     res.setHeader('Content-Length', totalSize);
//     res.setHeader('Content-Type', 'application/octet-stream');
//     res.setHeader('Content-Disposition', 'attachment; filename="downloaded_file"');

//     while (currentPosition < totalSize) {
//         const end = Math.min(currentPosition + chunkSize - 1, totalSize - 1);
//         try {
//             await loadChunk(res, url, currentPosition, end);
//             currentPosition += chunkSize;
//             console.log(`Loaded chunk: ${currentPosition} to ${end}`);
//         } catch (error) {
//             console.error('Error loading chunk:', error);
//             break;
//         }
//     }

//     console.log('File loading complete');
//     res.end();
// }

// router.get("/", async (req, res) => {
//     try {
//         const response = await fetch("https://examplefile.com/file-download/25", { method: 'HEAD' });
//         const totalSize = parseInt(response.headers.get('Content-Length'), 10);
//         loadFileInChunks(res, "https://examplefile.com/file-download/25", totalSize); // Call function to stream file to response
//     } catch (error) {
//         console.error('Error downloading file:', error);
//         res.status(500).send({ error: "Error downloading file" });
//     }
// });

// export default router;


// ใช้ได้
// import express from "express";
// import fetch from "node-fetch";

// const router = express.Router();

// const chunkSize = 10 * 1024 * 1024; // 10 MB

// async function streamFile(res, url) {
//     const response = await fetch(url);
//     if (response.ok) {
//         res.setHeader('Content-Length', response.headers.get('Content-Length'));
//         res.setHeader('Content-Type', response.headers.get('Content-Type'));
//         res.setHeader('Content-Disposition', response.headers.get('Content-Disposition'));
//         response.body.pipe(res);
//     } else {
//         throw new Error(`Failed to download file: ${response.statusText}`);
//     }
// }

// router.get("/", async (req, res) => {
//     try {
//         await streamFile(res, "https://examplefile.com/file-download/25");
//     } catch (error) {
//         console.error('Error downloading file:', error);
//         res.status(500).send({ error: "Error downloading file" });
//     }
// });

// export default router;

import express from "express";
import fetch from "node-fetch";

const router = express.Router();

const chunkSize = 10 * 1024 * 1024; // 10 MB

async function streamFile(res, url) {
    const response = await fetch(url);
    if (response.ok) {
        res.setHeader('Content-Length', response.headers.get('Content-Length'));
        res.setHeader('Content-Type', response.headers.get('Content-Type'));
        res.setHeader('Content-Disposition', response.headers.get('Content-Disposition'));

        // Pipe response stream in chunks to the client response
        response.body.on('data', (chunk) => {
          console.log(chunk);
            res.write(chunk);
        });

        response.body.on('end', () => {
            res.end();
        });
    } else {
        throw new Error(`Failed to download file: ${response.statusText}`);
    }
}

router.get("/", async (req, res) => {
    try {
        await streamFile(res, "https://examplefile.com/file-download/25");
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).send({ error: "Error downloading file" });
    }
});

export default router;


