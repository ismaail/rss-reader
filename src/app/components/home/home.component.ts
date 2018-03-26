import "rxjs/add/operator/map";
import { Feed } from "../../feed/feed.model";
import { Component, OnInit } from '@angular/core';
import { FeedParser } from "../../feed/feed-parser";
import { FeedService } from "../../feed/feed.service";
import { Subscription } from '../../subscription/subscription.model';

const { shell } = window.require('electron');

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    providers: [FeedService],
})
export class HomeComponent implements OnInit {
    feed: Feed = null;
    subscriptions: Subscription[] = [];

    constructor(private feedService: FeedService) {
    }

    ngOnInit() {
        this.subscriptions = [
            Object.assign(new Subscription(), { id: 1, name: "PHP Planet", url: "http://www.planet-php.org/rss/", count: 0 }),
            Object.assign(new Subscription(), { id:2, name: "Grafikart", url: "https://feeds.feedburner.com/Grafikart", count: 0}),
        ];
    }

    open(url: string) {
        console.log('open', url);
        shell.openExternal(url);
    }

    onSubscriptionClick(subscription: Subscription) {
        this.feed = null;

        this.feedService.get(subscription.url).subscribe((xml) => {
            const parser = new FeedParser();
            this.feed = parser.parse(xml);
        });
    }
}
