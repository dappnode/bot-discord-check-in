import { expect } from "chai";
import * as sheets from "../src/google-sheets";
import { connectionDiscord } from "../src/index";

describe("Google-Sheets", () => {
  it("Should get the data from the First sheet", async () => {
    if (!process.env.DOC_GOOGLE_SPREADSHEET) {
      throw Error("DOC_GOOGLE_SPREADSHEET must exist in the environment");
    }
    if (!process.env.CLIENT_SECRET) {
      throw Error("CLIENT_SECRET must exist in the environment");
    }
    const data = await sheets.getChecks();
    expect(data).to.not.be.null;
  });

  it("Should get the data from the Second sheet", async () => {
    if (!process.env.DOC_GOOGLE_SPREADSHEET) {
      throw Error("DOC_GOOGLE_SPREADSHEET must exist in the environment");
    }
    if (!process.env.CLIENT_SECRET) {
      throw Error("CLIENT_SECRET must exist in the environment");
    }
    const data = await sheets.getEmployeesRows();
    expect(data).to.not.be.null;
  });

  it("It should return the current date", () => {
    const date = sheets.getDate();
    console.log(date);
    expect(date).to.not.be.null;
    expect(typeof date).equal.toString;
  });
});

describe("Discord", () => {
  it("It should connect to discord", async () => {
    if (!process.env.TOKEN_DISCORD) {
      throw Error("TOKEN_DISCORD must exist in the environment");
    }
    await connectionDiscord();
  });
});
