import { Http, Response } from 'angular2/http';

export default class TagsService {
  constructor(http: Http) {
    this.http = http;
  }

  getTags() {
    return this.http.get('/tags')
      .map((resp: Response) => resp.json());
  }

  createOne(tag) {
    return this.http.post('/tags', JSON.stringify({ name: tag }))
      .map((resp: Response) => resp.json());
  }
}
