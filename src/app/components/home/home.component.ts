import "rxjs/add/operator/map";
import { Feed } from "../../feed/feed.model";
import { Component, OnInit } from '@angular/core';
import { FeedParser } from "../../feed/feed-parser";
import { FeedService } from "../../feed/feed.service";
import { ModalService } from '../modal/modal.service';
import { Subscription, Subscription } from '../../subscription/subscription.model';
import { SubscriptionService } from '../../subscription/subscription.service';

const { shell } = window.require('electron');

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    providers: [FeedService, SubscriptionService],
})
export class HomeComponent implements OnInit {
    feed: Feed = null;
    subscriptions: Subscription[] = [];

    /**
     * HomeComponent Class constructor
     *
     * @param {FeedService} feedService
     * @param {ModalService} modalService
     * @param {SubscriptionService} subscriptionService
     */
    constructor(
        private feedService: FeedService,
        private modalService: ModalService,
        private subscriptionService: SubscriptionService) {
    }

    /**
     * Component OnInit
     */
    ngOnInit() {
        this.subscriptionService.all()
            .subscribe(
                (subscriptions: Subscription[]) => {
                    this.subscriptions = subscriptions;
                },
                (err) => console.error("Error loading subscription data!", err)
            );
    }

    /**
     * Open url in the external Browser.
     *
     * @param {string} url
     */
    open(url: string) {
        console.log('open', url);
        shell.openExternal(url);
    }

    /**
     * @param {Subscription} subscription
     */
    onSubscriptionClick(subscription: Subscription) {
        this.feed = null;

        this.feedService.get(subscription.url).subscribe((xml) => {
            const parser = new FeedParser();
            this.feed = parser.parse(xml);
        });
    }

    /**
     * Open Add New Feed Modal
     *
     * @param {string} id
     */
    onAddFeedClick(id: string){
        this.modalService.open(id);
    }
}
