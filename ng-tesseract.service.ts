import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createWorker } from 'tesseract.js';

@Injectable({
  providedIn: 'root'
})
export class TesseractService {

  worker: any;

  constructor() {
    this.worker = createWorker();
  }

  public imageToText(img: string, lang: string): any {
    const ocr$ = new Observable(observer => {
      (async () => {
        await this.worker.load();
        await this.worker.loadLanguage(lang);
        await this.worker.initialize(lang);
        const { data: { text } } = await this.worker.recognize(img);
        observer.next(text);
        this.worker.terminate();
        observer.complete();
      })();
    });

    return ocr$;
  }
}
