import { Http, Response } from 'angular2/http';
import { Injectable } from 'angular2/core';

@Injectable()
export default class TagsService {
  constructor(protected http: Http) {
    this.http = http;
  }

  getTags() {
    return this.http.get('/tags')
      .map((resp: Response) => resp.json());
  }

  createOne(tag: string) {
    return this.http.post('/tags', JSON.stringify({ name: tag }))
      .map((resp: Response) => resp.json());
  }
}