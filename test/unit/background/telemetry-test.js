/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import { setAccount, Account } from "src/webextension/background/accounts";
import * as telemetry from "src/webextension/background/telemetry";

chai.use(sinonChai);

describe("background > telemetry", () => {
  let onMessage;

  beforeEach(() => {
    browser.runtime.onMessage.addListener(onMessage = sinon.stub().returns({}));
  });

  afterEach(() => {
    browser.runtime.onMessage.mockClearListener();
  });

  describe("no fxa uid", () => {
    before(() => {
      setAccount(new Account({
        config: "mock-telemetry",
        info: undefined,
      }));
    });
    after(() => {
      setAccount();
    });

    it("recordEvent()", async () => {
      const result = await telemetry.recordEvent("method", "object");
      expect(result).to.deep.equal({});
      expect(onMessage).to.have.been.calledWith({
        type: "telemetry_event",
        method: "method",
        object: "object",
        extra: undefined,
      });
    });

    it("setScalar()", async () => {
      const result = await telemetry.setScalar("name", "value");
      expect(result).to.deep.equal({});
      expect(onMessage).to.have.been.calledWith({
        type: "telemetry_scalar",
        name: "name",
        value: "value",
      });
    });

    it("recordEvent() with extra", async () => {
      const result = await telemetry.recordEvent("method", "object",
                                                 {extra: "value"});
      expect(result).to.deep.equal({});
      expect(onMessage).to.have.been.calledWith({
        type: "telemetry_event",
        method: "method",
        object: "object",
        extra: {extra: "value"},
      });
    });
  });
});
