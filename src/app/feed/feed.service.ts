import "rxjs/add/operator/map";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class FeedService {
    /**
     * Class FeedService constructor
     *
     * @param {HttpClient} http
     */
    constructor(private http: HttpClient) {
    }

    /**
     * @param {string} url
     * @returns {Observable<string>}
     */
    get(url: string) {
        return this.http.request('get', url, {
            responseType: "text"
        });
    }
}
