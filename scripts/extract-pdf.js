const fs = require('fs');
const pdf = require('pdf-parse');

const pdfPath = 'e:/K4NN4N/ashique-digital/public/lead-gen-audit.pdf';

async function extractText() {
    try {
        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await pdf(dataBuffer);
        
        console.log('---TEXT_START---');
        console.log(data.text);
        console.log('---TEXT_END---');
        console.log('Pages:', data.numpages);
    } catch (error) {
        console.error('Error extracting PDF:', error);
    }
}

extractText();
