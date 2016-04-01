import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';

export default class TagsService {
  constructor(http: Http) {
    this.http = http;
  }

  getTags() {
    return this.http.request('/tags')
      .map((resp: Response) => resp.json());
  }
}