import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type Item = { id: string, name: string };

@Injectable({
  providedIn: 'root'
})
export class FilemanPropertiesLoaderService {
  properties: Map<string, string>;
  items: Item[];
  firstTime = true;

  constructor(private http: HttpClient) {
    this.properties = new Map();
    this.properties.set('serverurl', 'http://localhost:10002');
      // this.http.get('file:///C:/dev/eclipse/workspaces/Angular/FileServer/src/properties.json')
      //   .subscribe((data: Item[]) => {
      //     this.items = data;
      //     this.items.forEach(item => {this.properties.set(item.id, item.name)});
      //     console.log(data);
      //     console.log(this.properties);
      //   });
  }

  getProperties(): Map<string, string> 
  {
    return this.properties;
  }

  public getProperty(key) {
    return this.getProperties().get(key);
  }

}

