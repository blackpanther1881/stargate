"use strict";
exports.__esModule = true;
var any_1 = require("cosmjs-types/google/protobuf/any");
var accounts_1 = require("./accounts");
describe("accounts", function () {
    describe("accountFromAny", function () {
        it("works for PeriodicVestingAccount", function () {
            // Queried from chain via `packages/cli/examples/get_akash_vesting_account.ts`.
            var any = any_1.Any.fromJSON({
                typeUrl: "/cosmos.vesting.v1beta1.PeriodicVestingAccount",
                value: "CsMBCnoKLGFrYXNoMXF5MHZ1cjNmbDJ1Y3p0cHpjcmZlYTdtYzhqd3o4eGptdnE3cXZ5EkYKHy9jb3Ntb3MuY3J5cHRvLnNlY3AyNTZrMS5QdWJLZXkSIwohA/XsdhwSIKU73TltD9STcaS07FNw0szR4a+oDLr6vikaGDggGxIUCgR1YWt0EgwxNjY2NjY2NzAwMDAaEwoEdWFrdBILMzcxOTAzMzAwMDAiFAoEdWFrdBIMMTY2NjY2NjcwMDAwKOC9wZkGEODvt/sFGhoIgOeEDxITCgR1YWt0Egs4MzMzMzMzNTAwMBoaCIC/ugcSEwoEdWFrdBILNDE2NjY2Njc1MDAaGgiAqMoHEhMKBHVha3QSCzQxNjY2NjY3NTAw"
            });
            var account = (0, accounts_1.accountFromAny)(any);
            expect(account).toEqual({
                address: "akash1qy0vur3fl2ucztpzcrfea7mc8jwz8xjmvq7qvy",
                pubkey: {
                    type: "tendermint/PubKeySecp256k1",
                    value: "A/XsdhwSIKU73TltD9STcaS07FNw0szR4a+oDLr6vika"
                },
                accountNumber: 56,
                sequence: 27
            });
        });
    });
});
