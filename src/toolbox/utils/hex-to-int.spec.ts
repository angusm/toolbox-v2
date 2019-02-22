import { hexToInt } from "./hex-to-int";
import { expect } from "chai";
import "mocha";

describe("hexToInt", () => {
  it("should correctly return a large value", () => {
    expect(hexToInt("FFFFFF")).to.equal(16777215);
  });
  it("should correctly return zero value", () => {
    expect(hexToInt("000000")).to.equal(0);
  });
});
