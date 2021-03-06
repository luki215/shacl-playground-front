import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public textData = '';
  public textShapes = '';
  public validating = false;

  public graph: string;
  public resultsText: string;
  public resultsAsShacl: boolean;

  public layout = 1;

  @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if(event.code === 'F5') {
        this.validate();
      }

    }

  constructor(private http: HttpClient) {}
  ngOnInit() {
  }

  setShapesFile(e) {
    const reader = new FileReader();
    reader.onload = (event: any) => this.textShapes = event.target.result;
    reader.onerror = error => console.error(error);
    reader.readAsText(e.target.files[0]);
  }


  setDataFile(e) {
    const reader = new FileReader();
    reader.onload = (event: any) => this.textData = event.target.result;
    reader.onerror = error => console.error(error);
    reader.readAsText(e.target.files[0]);
  }


  validate() {
    this.validating = true;
    const formData = new FormData();
    formData.append('shapes_file', new File([this.textShapes], 'shapes.txt'));
    formData.append('data_file', new File([this.textData], 'data.txt'));


    const req = this.http.post(environment.apiURL, formData);

    req.pipe(
      finalize(() => {this.validating = false; })
    ).subscribe((res: any) => {
      this.graph = res.results_graph;
      this.resultsText = res.results_text;
    }, (err) => {
      this.graph = 'Unknown error';
      this.resultsText = 'Unknown error';
    });

  }

}
