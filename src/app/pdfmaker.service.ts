import { Injectable } from '@angular/core';
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root',
})
export class PdfmakerService {
  constructor() {}

  pdfMakeOpen(document: any): void {
    pdfMake.createPdf(document).open();
  }

  pdfMakePrint(document: any): void {
    pdfMake.createPdf(document).print();
  }

  pdfMakeDownload(document: any, fileName: any): void {
    pdfMake.createPdf(document).download(fileName);
  }
}
