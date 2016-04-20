import { Injector } from '../lib/injector.ts';
import { Http } from '../lib/http.ts';
import { Subject, Observable } from 'rxjs';

export class GetFiles {
  private codesArray: Array<string>;
  private rawFiles: Subject<Object> = new Subject<Object>();
  private singleFiles: Subject<Object> = new Subject<Object>();
  private githubUrl: string = 'https://api.github.com/repositories/54200760/contents/';
  private socket;

  public init(socket, codesArray: Array<string>) {
    this.socket = socket;
    this.codesArray = codesArray;

    this.getFiles();
    this.getAllFiles();
  }

  private getFiles(): void {
    this.codesArray.forEach((name) => {
      this.socket.emit('getFiles', name);
    });
  }

  public get files(): Observable<CodeFile> {
    return this.singleFiles.map((file: any) => {
      return {
        path: file.path,
        content: atob(file.content),
        name: file.name,
        size: file.size,
        url: file.html_url,
        download: file.download_url
      };
    }).scan(this.makeObject, {});
  }

  private getAllFiles(): void {
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

  private makeObject(acc: Object, curr: CodeFile): Object {
    const src = 'src/';
    let path = curr.path;
    path = path.slice(src.length);
    const properties = path.match(/([A-z0-9-.])+/g);

    function recursive(obj, propertiesArray, index) {
      if (!obj[propertiesArray[index]] && propertiesArray.length - 1 === index) {
        obj[propertiesArray[index]] = curr;
      } else if (!obj[propertiesArray[index]]) {
        obj[propertiesArray[index]] = {};
      }

      if (index < propertiesArray.length) {
        recursive(obj[propertiesArray[index]], propertiesArray, index + 1);
      }
    }

    recursive(acc, properties, 0);

    return acc;
  }
}

Injector.add(GetFiles);
