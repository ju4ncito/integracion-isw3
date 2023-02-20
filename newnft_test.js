Feature("newnft");

Scenario("User adds NFT transaction", ({ I }) => {
  I.amOnPage("https://afraid-tiger-production.up.railway.app/");
  I.fillField("#nft", "CryptoPunk");
  I.fillField("#price", "3");
  I.selectOption("#status", "Sold");
  I.click("Submit");
  I.click("Submit");
  I.waitForText("NFT added correctly", 20);
  I.seeResponseCodeIs(200);
});
