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

    constructor(private feedService: FeedService) {
    }

    ngOnInit() {
        const feedUrl = "https://feeds.feedburner.com/Grafikart";

        this.feedService.get(feedUrl).subscribe((xml) => {
            const parser = new FeedParser();
            this.rss = parser.parse(xml);
        });
    }

    open(url: string) {
        console.log('open', url);
        shell.openExternal(url);
    }

}
