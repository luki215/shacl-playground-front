import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public shapesFile: File;
  public dataFile: File;
  public textData = '';
  public textShapes = '';


  public graph: string;
  public results_text: string;

  constructor(private http: HttpClient) {}
  ngOnInit() {
  }

  setShapesFile(e) {
    this.shapesFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => this.textShapes = event.target.result;
    reader.onerror = error => console.error(error);
    reader.readAsText(this.shapesFile);
  }


  setDataFile(e) {
    this.dataFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => this.textData = event.target.result;
    reader.onerror = error => console.error(error);
    reader.readAsText(this.dataFile);
  }


  validate() {
    const formData = new FormData();
    formData.append('shapes_file', this.shapesFile);
    formData.append('data_file', this.dataFile);


    const req = this.http.post('http://localhost:5000/', formData, {
      reportProgress: true,
      headers: new HttpHeaders({ 'ngsw-bypass': 'true' })
    });

    req.pipe(
      // push current upload progress to observable
      // map((e) => this.getPercentDone(e))
    ).subscribe((res: any) => {
      console.log(res);
      if (typeof(res) !== 'number') {
        this.graph = res.results_graph;
        this.results_text = res.results_text;
      }
    });


  }

  private getPercentDone(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.Sent:
        return 0;

      case HttpEventType.UploadProgress:
        return Math.round((100 * event.loaded) / event.total);

      case HttpEventType.Response:
        return event.body;
    }
  }

}
