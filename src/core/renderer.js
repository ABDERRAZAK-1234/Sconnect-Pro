const ejs = require('ejs');
const path = require('path');

const viewsPath = path.join(__dirname, '../../views');

async function render(res, view, data = {}) {
    try {
        const filePath = path.join(viewsPath, `${view}.ejs`);

        const html = await ejs.renderFile(filePath, data);

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        res.end(html);

    } catch (error) {
        console.error('Erreur de rendu EJS :', error);

        res.writeHead(500, {
            'Content-Type': 'text/plain; charset=utf-8'
        });

        res.end(`Erreur EJS : ${error.message}`);
    }
}

module.exports = render;