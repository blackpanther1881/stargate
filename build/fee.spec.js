"use strict";
exports.__esModule = true;
var math_1 = require("@cosmjs/math");
var fee_1 = require("./fee");
describe("GasPrice", function () {
    it("can be constructed", function () {
        var inputs = ["3.14", "3", "0.14"];
        inputs.forEach(function (input) {
            var gasPrice = new fee_1.GasPrice(math_1.Decimal.fromUserInput(input, 18), "utest");
            expect(gasPrice.amount.toString()).toEqual(input);
            expect(gasPrice.denom).toEqual("utest");
        });
    });
    describe("fromString", function () {
        it("works", function () {
            var inputs = {
                // Test amounts
                "3.14utest": { amount: "3.14", denom: "utest" },
                "3utest": { amount: "3", denom: "utest" },
                "0.14utest": { amount: "0.14", denom: "utest" },
                // Test denoms
                "0.14sht": { amount: "0.14", denom: "sht" },
                "0.14testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest": {
                    amount: "0.14",
                    denom: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest"
                },
                "0.14ucoin2": { amount: "0.14", denom: "ucoin2" },
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "0.14FOOBAR": { amount: "0.14", denom: "FOOBAR" }
            };
            for (var _i = 0, _a = Object.entries(inputs); _i < _a.length; _i++) {
                var _b = _a[_i], input = _b[0], expected = _b[1];
                var gasPrice = fee_1.GasPrice.fromString(input);
                expect(gasPrice.amount.toString()).withContext("Input: " + input).toEqual(expected.amount);
                expect(gasPrice.denom).withContext("Input: " + input).toEqual(expected.denom);
            }
        });
        it("errors for invalid gas price", function () {
            // Checks basic format <amount><denom>
            expect(function () { return fee_1.GasPrice.fromString(""); }).toThrowError(/Invalid gas price string/i);
            expect(function () { return fee_1.GasPrice.fromString("utkn"); }).toThrowError(/Invalid gas price string/i);
            expect(function () { return fee_1.GasPrice.fromString("@utkn"); }).toThrowError(/Invalid gas price string/i);
            expect(function () { return fee_1.GasPrice.fromString("234"); }).toThrowError(/Invalid gas price string/i);
            expect(function () { return fee_1.GasPrice.fromString("-234tkn"); }).toThrowError(/Invalid gas price string/i);
            // Checks details of <denom>
            expect(function () { return fee_1.GasPrice.fromString("234t"); }).toThrowError(/denom must be between 3 and 128 characters/i);
            expect(function () { return fee_1.GasPrice.fromString("234tt"); }).toThrowError(/denom must be between 3 and 128 characters/i);
            expect(function () {
                return fee_1.GasPrice.fromString("234ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt");
            }).toThrowError(/denom must be between 3 and 128 characters/i);
            // Checks details of <amount>
            expect(function () { return fee_1.GasPrice.fromString("3.utkn"); }).toThrowError(/Fractional part missing/i);
            expect(function () { return fee_1.GasPrice.fromString("..utkn"); }).toThrowError(/More than one separator found/i);
        });
    });
});
describe("calculateFee", function () {
    it("multiplies the gas price by the gas limit", function () {
        var gasLimit = 80000;
        var gasPrice = fee_1.GasPrice.fromString("0.025ucosm");
        var fee = (0, fee_1.calculateFee)(gasLimit, gasPrice);
        expect(fee).toEqual({
            amount: [{ amount: "2000", denom: "ucosm" }],
            gas: "80000"
        });
    });
    it("accepts a string gas price", function () {
        var gasLimit = 80000;
        var gasPrice = "0.025ucosm";
        var fee = (0, fee_1.calculateFee)(gasLimit, gasPrice);
        expect(fee).toEqual({
            amount: [{ amount: "2000", denom: "ucosm" }],
            gas: "80000"
        });
    });
});
