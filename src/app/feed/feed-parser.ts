import { RSS } from "./rss.model";

const xml2js = require("xml2js");
const util = require("util");

export class FeedParser {
    /**
     * Parse XML text to RSS Object
     *
     * @param {string} xml
     * @returns {RSS}
     */
    parse(xml: string) {
        let rss = new RSS();
        const parser = new xml2js.Parser({trim: false, normalize: true, mergeAttrs: true});

        parser.parseString(xml, function (err, result) {
            if (err) {
                throw new Error("Error parsign xml feed");
            }

            let channel = result.rss.channel;
            if (util.isArray(result.rss.channel)) {
                channel = result.rss.channel[0];
            }

            if (channel.title) {
                rss.title = channel.title[0];
            }

            if (channel.description) {
                rss.description = channel.description[0];
            }
            if (channel.link) {
                rss.url = channel.link[0];
            }

            if (channel.image) {
                rss.image = channel.image[0].url
            }

            if (!rss.image && channel["itunes:image"]) {
                rss.image = channel['itunes:image'][0].href
            }

            if (channel.item) {
                let items = channel.item;
                if (!util.isArray(items)) {
                    items = [items];
                }

                items.forEach(function (val) {
                    let obj:any = {};
                    obj.title = !util.isNullOrUndefined(val.title) ? val.title[0] : '';
                    obj.description = !util.isNullOrUndefined(val.description) ? val.description[0] : '';
                    obj.url = obj.link = !util.isNullOrUndefined(val.link) ? val.link[0] : '';

                    if (val.pubDate) {
                        //lets try basis js date parsing for now
                        obj.created = Date.parse(val.pubDate[0]);
                    }

                    if (val['media:content']) {
                        obj.media = val.media || {};
                        obj.media.content = val['media:content'];
                    }

                    if (val['media:thumbnail']) {
                        obj.media = val.media || {};
                        obj.media.thumbnail = val['media:thumbnail'];
                    }

                    rss.items.push(obj);
                });
            }
        });

        return rss;
    }
}
