import * as Datastore from "nedb";
import { Observable } from "rxjs"; // Using rxjs/Observable throws error: bindNodeCallback is not a function.
import { Injectable } from "@angular/core";

const { remote } = window.require('electron');
const app = remote.app;

@Injectable()
export class StorageService {
    db: Datastore;
    path: string = app.getPath("appData");

    /**
     * Wrapper for Datastore find function,
     * using class method throws db error.
     *
     * @param {object} query
     * @param {callable} callback
     */
    find: Function = (query = {}, callback: Function) => {
        this.db.find(query, callback);
    };

    /**
     * StorageService Class constructor
     */
    constructor() {
        this.db = new Datastore({ filename: this.path, autoload: true });
    }

    /**
     * Find all Subscriptions
     *
     * @returns {Observable}
     */
    all(): Observable {
        const sourceFunction: Function = Observable. bindNodeCallback(this.find);
        return sourceFunction({});
    }
}
