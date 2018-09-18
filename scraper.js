const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
// import { scraperInsert } from './client/src/service/scraper.service'

axios("https://www.pcgamer.com")
  .then(result => {
    const $ = cheerio.load(result.data);
    const articles = [];
    const articleWidgets = $(".feature-block-item-wrapper").each((i, elem) => {
      const articleElement = $(elem);
      const article = {
        title: articleElement.find(".article-name").text(),
        url: articleElement.find("a").attr("href"),
        pic: articleElement.find(".lazy-image").attr("data-src")
      };

      articles.push(article);
    });

    const articleWidgets2 = $(".listingResult").each((i, elem) => {
      const articleElement = $(elem);
      const article2 = {
        title: articleElement.find("h3").text(),
        author: articleElement.find(".by-author").text(),
        url: articleElement.find("a").attr("href"),
        pic: articleElement
          .find(".article-lead-image-wrap")
          .attr("data-original")
      };

      articles.push(article2);
    });

    console.log(JSON.stringify(articles, null, 2));
    fs.writeFile("scrapedData.txt", JSON.stringify(articles, null, 2), err => {
      if (err) throw err;
      console.log("File Saved");
    });
  })
  .catch(err => {
    console.log(err);
  });
