import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subscription } from './subscription.model';
import { StorageService } from "../storage/storage.service";

@Injectable()
export class SubscriptionService {
    /**
     * SubscriptionService Class constructor
     *
     * @param {StorageService} storageService
     */
    constructor(private storageService: StorageService) {}

    /**
     * Find All Subscriptions
     *
     * @returns {Observable}
     */
    all(): Observable<Subscription[]> {
        return this.storageService.all()
            .map((response: any) => <Subscription[]>response);
    }
}
