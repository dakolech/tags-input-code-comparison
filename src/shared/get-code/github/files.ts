import { Http } from '../lib/http.ts';
import { Subject } from 'rxjs';

export class Files {
  private codesArray: Array<string>;
  private rawFiles: Subject<Object> = new Subject<Object>();
  private singleFiles: Subject<Object> = new Subject<Object>();
  private githubUrl: string = 'https://api.github.com/repositories/54200760/contents/';

  constructor(codesArray: Array<string>) {
    this.codesArray = codesArray;

    this.getFiles();
    this.getAllFiles();
  }

  getFiles(): Array<string> {
    const files = [];
    this.codesArray.forEach((name) => {
      Http.get(`${this.githubUrl}src/${name}`, (resp) => {
        this.rawFiles.next(resp);
      });
    });
    return files;
  }

  get files() {
    return this.singleFiles.map((file) => {
      return {
        path: file.path,
        content: atob(file.content),
        name: file.name,
        size: file.size,
        url: file.html_url,
        download: file.download_url
      }
    }).scan(this.makeObject, {});
  }

  private getAllFiles() {
    this.rawFiles.subscribe((files: any) => {
      files.filter((file) => file.type === 'file').forEach((file) => {
        Http.get(`${this.githubUrl}${file.path}`, (resp) => {
          this.singleFiles.next(resp);
        });
      });

      files.filter((file) => file.type === 'dir').forEach((file) => {
        Http.get(`${this.githubUrl}${file.path}`, (resp) => {
          this.rawFiles.next(resp);
        });
      });
    });
  }

  private makeObject(acc, curr) {
    const src = 'src/';
    let path = curr.path;
    path = path.slice(src.length);
    const properties = path.match(/([A-z0-9-.])+/g);

    function recursive(obj, propertiesArray, index) {
      if (!obj[propertiesArray[index]] && propertiesArray.length-1 === index) {
        obj[propertiesArray[index]] = curr;
      } else if (!obj[propertiesArray[index]]) {
        obj[propertiesArray[index]] = {};
      }

      if (index < propertiesArray.length) {
        recursive(obj[propertiesArray[index]], propertiesArray, index+1);
      }
    }

    recursive(acc, properties, 0);

    return acc;
  }
}