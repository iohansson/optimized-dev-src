// 🐔 "Hey, check out the `fetchRSSFeedItems()` function below. I left a message
//     for you. *flutters away*"

import { feedURLs } from "../config";
import RSSParser from 'rss-parser';
import dayjs from "dayjs";

/**
 * Converts an RSS feed item into a simpler object.
 */
const buildItem = ({ item, feed }) => {
  return {
    guid: item.guid || item.link,
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    comments: item.comments || null,
    feedTitle: feed.title,
    feedURL: feed.link,
  };
};

/**
 * Fetches RSS feed items from URLs configured in `config.js`'s `feedURLs`
 * export. Each RSS feed item is reshaped to better suit the app and reduce
 * in-app network payload sizes.
 *
 * Items are sorted by publication date.
 */
export const fetchRSSFeedItems = async () => {
  const rssParser = new RSSParser();
  const feeds = await Promise.all(feedURLs.map(url => rssParser.parseURL(url)));
  const items = feeds.flatMap(feed => feed.items.map(item => buildItem({ item, feed })));
  items.sort((a, b) => dayjs(b.pubDate).isAfter(dayjs(a.pubDate)) ? 1 : -1);

  return items;
};
