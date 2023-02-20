Feature("newnft");
const { I } = inject();
const assert = require("assert");

Scenario("is backend running", ({ I }) => {
  I.amOnPage("https://filthy-line-production.up.railway.app/");
});

Scenario("new NFT transaction", ({ I }) => {
  I.amOnPage("https://afraid-tiger-production.up.railway.app/");
  I.fillField("#nft", "CryptoPunk");
  I.fillField("#price", "3");
  I.selectOption("#status", "Sold");
  I.click("Submit");
  I.waitForText("NFT added correctly", 2);
});

Scenario("new NFT transaction with invalid price", ({ I }) => {
  I.amOnPage("https://afraid-tiger-production.up.railway.app/");
  I.fillField("#nft", "CryptoPunk");
  I.fillField("#price", "invalid");
  I.selectOption("#status", "Sold");
  I.click("Submit");
  I.seeInPopup("Please fill in all the fields.");
  I.acceptPopup();
});

Scenario("new NFT transaction without status", ({ I }) => {
  I.amOnPage("https://afraid-tiger-production.up.railway.app/");
  I.fillField("#nft", "CryptoPunk");
  I.fillField("#price", "3");
  I.click("Submit");
  I.seeInPopup("Please fill in all the fields.");
  I.acceptPopup();
});

Scenario("new NFT transaction without name", ({ I }) => {
  I.amOnPage("https://afraid-tiger-production.up.railway.app/");
  I.fillField("#price", "3");
  I.selectOption("#status", "Sold");
  I.click("Submit");
  I.seeInPopup("Please fill in all the fields.");
  I.acceptPopup();
});

Scenario("new NFT transaction with backend check", async ({ I }) => {
  const nft = "CryptoPunk";
  const price = Math.floor(Math.random() * 10) + 1;
  const statusOptions = ["sold", "bought"];
  const status =
    statusOptions[Math.floor(Math.random() * statusOptions.length)];

  I.amOnPage("https://afraid-tiger-production.up.railway.app/");
  I.fillField("#nft", nft);
  I.fillField("#price", price);
  I.selectOption("#status", status);
  I.click("Submit");

  await new Promise((r) => setTimeout(r, 3000));

  const response = await fetch(
    "https://filthy-line-production.up.railway.app/transaction"
  );
  const transactions = await response.json();
  const lastTransaction = transactions[transactions.length - 1];

  assert.equal(nft, lastTransaction.nft);
  assert.equal(price, lastTransaction.price);
  assert.equal(status, lastTransaction.status);
});
