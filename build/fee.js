"use strict";
exports.__esModule = true;
exports.calculateFee = exports.GasPrice = void 0;
var math_1 = require("@cosmjs/math");
var proto_signing_1 = require("@cosmjs/proto-signing");
/**
 * Denom checker for the Cosmos SDK 0.42 denom pattern
 * (https://github.com/cosmos/cosmos-sdk/blob/v0.42.4/types/coin.go#L599-L601).
 *
 * This is like a regexp but with helpful error messages.
 */
function checkDenom(denom) {
    if (denom.length < 3 || denom.length > 128) {
        throw new Error("Denom must be between 3 and 128 characters");
    }
}
/**
 * A gas price, i.e. the price of a single unit of gas. This is typically a fraction of
 * the smallest fee token unit, such as 0.012utoken.
 *
 * This is the same as GasPrice from @cosmjs/launchpad but those might diverge in the future.
 */
var GasPrice = /** @class */ (function () {
    function GasPrice(amount, denom) {
        this.amount = amount;
        this.denom = denom;
    }
    /**
     * Parses a gas price formatted as `<amount><denom>`, e.g. `GasPrice.fromString("0.012utoken")`.
     *
     * The denom must match the Cosmos SDK 0.42 pattern (https://github.com/cosmos/cosmos-sdk/blob/v0.42.4/types/coin.go#L599-L601).
     * See `GasPrice` in @cosmjs/stargate for a more generic matcher.
     *
     * Separators are not yet supported.
     */
    GasPrice.fromString = function (gasPrice) {
        // Use Decimal.fromUserInput and checkDenom for detailed checks and helpful error messages
        var matchResult = gasPrice.match(/^([0-9.]+)([a-z][a-z0-9]*)$/i);
        if (!matchResult) {
            throw new Error("Invalid gas price string");
        }
        var _ = matchResult[0], amount = matchResult[1], denom = matchResult[2];
        checkDenom(denom);
        var fractionalDigits = 18;
        var decimalAmount = math_1.Decimal.fromUserInput(amount, fractionalDigits);
        return new GasPrice(decimalAmount, denom);
    };
    return GasPrice;
}());
exports.GasPrice = GasPrice;
function calculateFee(gasLimit, gasPrice) {
    var processedGasPrice = typeof gasPrice === "string" ? GasPrice.fromString(gasPrice) : gasPrice;
    var denom = processedGasPrice.denom, gasPriceAmount = processedGasPrice.amount;
    var amount = Math.ceil(gasPriceAmount.multiply(new math_1.Uint53(gasLimit)).toFloatApproximation());
    return {
        amount: (0, proto_signing_1.coins)(amount, denom),
        gas: gasLimit.toString()
    };
}
exports.calculateFee = calculateFee;
