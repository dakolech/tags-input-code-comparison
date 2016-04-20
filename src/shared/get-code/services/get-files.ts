import { Injector } from '../lib/injector.ts';
import { Http } from '../lib/http.ts';
import { Subject, Observable } from 'rxjs';

export class GetFiles {
  private codesArray: Array<string>;
  private rawFiles: Subject<Object> = new Subject<Object>();
  private singleFiles: Subject<Object> = new Subject<Object>();
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
    return this.singleFiles.scan(this.makeObject, {});
  }

  private getAllFiles(): void {
    this.socket.on('files', (data) => {
      this.singleFiles.next({
        content: data.content,
        name: data.name,
        path: data.path
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
