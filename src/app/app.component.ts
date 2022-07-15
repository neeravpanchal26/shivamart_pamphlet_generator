import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import html2canvas from 'html2canvas';
import { PdfmakerService } from './pdfmaker.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public infoForm!: FormGroup;
  title = 'shivamart';
  public products: any = [];

  @ViewChild('page') page!: ElementRef;

  constructor(
    private pdfMaker: PdfmakerService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.infoForm = this.formBuilder.group({
      headerImage: [''],
      address: [''],
      telephone: [''],
      fromDate: [''],
      toDate: [''],
      footerImage: [''],
      productFile: [''],
    });
  }

  formSubmit(): void {
    this.http
      .get(this.infoForm.controls['productFile'].value, {
        responseType: 'text',
      })
      .subscribe((data) => {
        let csvToRowArray = data.split('\r\n');
        csvToRowArray.map((item) => {
          let product = item.split(',');
          this.products.push({
            image: product[0],
            brand: product[1],
            desc: product[2],
            size: product[3],
            price: product[4],
          });
        });
      });
  }

  createPdf() {
    html2canvas(this.page.nativeElement, {
      useCORS: true,
      allowTaint: false,
    }).then((canvas) => {
      let image = canvas.toDataURL();
      let docDefinition = {
        // a string or { width: number, height: number }
        pageSize: 'A4',
        pageOrientation: 'portrait',
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: Array(4).fill(0),

        // Content
        content: [
          {
            image: image,
            width: 595,
          },
        ],
      };
      this.pdfMaker.pdfMakeOpen(docDefinition);
    });
  }
}
