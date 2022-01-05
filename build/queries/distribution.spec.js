"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/* eslint-disable @typescript-eslint/naming-convention */
var proto_signing_1 = require("@cosmjs/proto-signing");
var tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
var utils_1 = require("@cosmjs/utils");
var signingstargateclient_1 = require("../signingstargateclient");
var stargateclient_1 = require("../stargateclient");
var testutils_spec_1 = require("../testutils.spec");
var distribution_1 = require("./distribution");
var queryclient_1 = require("./queryclient");
function makeClientWithDistribution(rpcUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var tmClient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tendermint_rpc_1.Tendermint34Client.connect(rpcUrl)];
                case 1:
                    tmClient = _a.sent();
                    return [2 /*return*/, [queryclient_1.QueryClient.withExtensions(tmClient, distribution_1.setupDistributionExtension), tmClient]];
            }
        });
    });
}
describe("DistributionExtension", function () {
    var defaultFee = {
        amount: (0, proto_signing_1.coins)(25000, "ucosm"),
        gas: "1500000"
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var wallet, client, msg, msgAny, memo, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(0, testutils_spec_1.simappEnabled)()) return [3 /*break*/, 5];
                    return [4 /*yield*/, proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                case 1:
                    wallet = _a.sent();
                    return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions)];
                case 2:
                    client = _a.sent();
                    msg = {
                        delegatorAddress: testutils_spec_1.faucet.address0,
                        validatorAddress: testutils_spec_1.validator.validatorAddress,
                        amount: (0, proto_signing_1.coin)(25000, "ustake")
                    };
                    msgAny = {
                        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                        value: msg
                    };
                    memo = "Test delegation for Stargate";
                    return [4 /*yield*/, client.signAndBroadcast(testutils_spec_1.faucet.address0, [msgAny], defaultFee, memo)];
                case 3:
                    result = _a.sent();
                    (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                    return [4 /*yield*/, (0, utils_1.sleep)(75)];
                case 4:
                    _a.sent(); // wait until transactions are indexed
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); });
    describe("communityPool", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithDistribution(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.distribution.communityPool()];
                    case 2:
                        response = _b.sent();
                        expect(response.pool).toBeDefined();
                        expect(response.pool).not.toBeNull();
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("delegationRewards", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithDistribution(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.distribution.delegationRewards(testutils_spec_1.faucet.address0, testutils_spec_1.validator.validatorAddress)];
                    case 2:
                        response = _b.sent();
                        expect(response.rewards).toBeDefined();
                        expect(response.rewards).not.toBeNull();
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("delegationTotalRewards", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithDistribution(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.distribution.delegationTotalRewards(testutils_spec_1.faucet.address0)];
                    case 2:
                        response = _b.sent();
                        expect(response.rewards).toBeDefined();
                        expect(response.rewards).not.toBeNull();
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("delegatorValidators", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithDistribution(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.distribution.delegatorValidators(testutils_spec_1.faucet.address0)];
                    case 2:
                        response = _b.sent();
                        expect(response.validators).toBeDefined();
                        expect(response.validators).not.toBeNull();
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("delegatorWithdrawAddress", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithDistribution(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.distribution.delegatorWithdrawAddress(testutils_spec_1.faucet.address0)];
                    case 2:
                        response = _b.sent();
                        expect(response.withdrawAddress).toBeDefined();
                        expect(response.withdrawAddress).not.toBeNull();
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("params", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithDistribution(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.distribution.params()];
                    case 2:
                        response = _b.sent();
                        expect(response.params).toBeDefined();
                        expect(response.params).not.toBeNull();
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("validatorCommission", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithDistribution(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.distribution.validatorCommission(testutils_spec_1.validator.validatorAddress)];
                    case 2:
                        response = _b.sent();
                        expect(response.commission).toBeDefined();
                        expect(response.commission).not.toBeNull();
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("validatorOutstandingRewards", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithDistribution(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.distribution.validatorOutstandingRewards(testutils_spec_1.validator.validatorAddress)];
                    case 2:
                        response = _b.sent();
                        expect(response.rewards).toBeDefined();
                        expect(response.rewards).not.toBeNull();
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("validatorSlashes", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithDistribution(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.distribution.validatorSlashes(testutils_spec_1.validator.validatorAddress, 1, 5)];
                    case 2:
                        response = _b.sent();
                        expect(response.slashes).toBeDefined();
                        expect(response.slashes).not.toBeNull();
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
