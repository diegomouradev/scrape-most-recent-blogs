/**
 * @name get list of links
 *
 * @desc Scrapes Hacker News for links on the home page and returns the top 10
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.tracing.start({
//     path: "trace.json",
//     categories: ["yvonne-chan"],
//   });
//   await page.goto("https://ca.rbcwealthmanagement.com/www.yvonnechan.ca/");

//   const iFrame = page
//     .frames()
//     .map((frame) => (frame.url ? frame.url() : frame));

//   console.log(iFrame);
//   await page.tracing.stop();
//   await browser.close();
// })();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.rbcwealthmanagement.com/ca/en/research-insights/"
  );
  const blogLinks = await page.$$eval(
    "a[class='bottom-link link-chev']",
    (blogLinks) => blogLinks.map((blogLink) => blogLink.href)
  );
  console.log(blogLinks.length);

  for (let i = 0; i < blogLinks.length; i++) {
    await page.goto(blogLinks[i]);
    const articleBody = await page.$eval(
      `div[class='article-body flipboard-keep']`,
      (articleBody) => articleBody.innerHTML.toString()
    );
    fs.writeFileSync(`./output-HTML/page-${i}.html`, articleBody);
    //   console.log(articleBody);
  }
  await browser.close();

  // const writeHTMLToFile =
})();
