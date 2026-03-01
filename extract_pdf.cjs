const fs = require('fs');
const PDFParser = require('pdf2json');

const pdfParser = new PDFParser(this, 1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFileSync("./extracted_pdf.txt", pdfParser.getRawTextContent());
    console.log("Done");
});

pdfParser.loadPDF("C:/Users/adipd/Documents/Paper_Banana/B31MV_Sample interim Questions-SOLUTIONS.pdf");
