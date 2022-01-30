const puppeteer = require("puppeteer");
const readlineSync = require("readline-sync");

console.log(
  "Hookben feedback bot\nThis bot will send you feedback from your users.\n"
);

console.log("Type of feedback?\n1. Dine in\n2. OJOL\n");
console.log("[!] Skip by enter to default (Dine in).");
let typeFeedback = readlineSync.question("[?] What you choose : ");

typeFeedback = typeFeedback || 1;

let totalFeedback = readlineSync.question(
  "[?] How many feedback you want to send : "
);

async function runBot() {
  const options = { waitUntil: "networkidle2" };
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const urlFeedback = {
    cinere_mall:
      "https://update.hokben.co.id/satisfaction/feedback?store=CINERE%20%20MALL",
    atrium_plaza:
      "https://update.hokben.co.id/satisfaction/feedback?store=ATRIUM%20PLAZA",
    arigatou: "https://update.hokben.co.id/satisfaction/arigatou",
  };

  console.log("Try to access page...");
  await page.goto(urlFeedback.atrium_plaza + "&serv=" + typeFeedback, options);
  console.log("Success to access feedback page...\n");
  // feedBack 1
  const feedback1 = await page.$("div#survey_1_1");
  await feedback1.click();
  await feedback1.dispose();
  console.log("feedback 1 clicked");
  // feedBack 2
  const feedback2 = await page.$("div#survey_2_1");
  await feedback2.click();
  await feedback2.dispose();
  console.log("feedback 2 clicked");
  // feedBack 3
  const feedback3 = await page.$("div#survey_3_1");
  await feedback3.click();
  await feedback3.dispose();
  console.log("feedback 3 clicked");
  // feedBack 4
  const feedback4 = await page.$("div#survey_4_1");
  await feedback4.click();
  await feedback4.dispose();
  console.log("feedback 4 clicked");
  // feedBack 5 (optional)
  if (typeFeedback == 1) {
    const feedback5 = await page.$("div#survey_5_1");
    await feedback5.click();
    await feedback5.dispose();
    console.log("feedback 5 clicked");
  }
  //   btn image submit feedback
  const btnSubmitFeedback = await page.$("img[width='300']");
  await btnSubmitFeedback.click();
  await btnSubmitFeedback.dispose();
  console.log("feedback submitted\n");
  await page.waitForNavigation();

  if (page.url() == urlFeedback.arigatou) {
    console.log("Thank you for your feedback");
  } else {
    console.log("Something wrong, please try again");
  }

  await browser.close();
}

function startFeedback(idx) {
  idx = idx || 1;
  if (idx <= totalFeedback) {
    date = new Date();
    console.log(
      `\n@ Start (${idx}) -- [${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`
    );
    runBot();
    setTimeout(function () {
      startFeedback(idx + 1);
    }, 8000);
  } else {
    console.log("\n~ All feedback successfuly sent..");
  }
}
startFeedback();
