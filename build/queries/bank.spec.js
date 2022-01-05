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
var tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
var testutils_spec_1 = require("../testutils.spec");
var bank_1 = require("./bank");
var queryclient_1 = require("./queryclient");
function makeClientWithBank(rpcUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var tmClient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tendermint_rpc_1.Tendermint34Client.connect(rpcUrl)];
                case 1:
                    tmClient = _a.sent();
                    return [2 /*return*/, [queryclient_1.QueryClient.withExtensions(tmClient, bank_1.setupBankExtension), tmClient]];
            }
        });
    });
}
describe("BankExtension", function () {
    describe("balance", function () {
        it("works for different existing balances", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response1, response2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithBank(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.bank.balance(testutils_spec_1.unused.address, testutils_spec_1.simapp.denomFee)];
                    case 2:
                        response1 = _b.sent();
                        expect(response1).toEqual({
                            amount: testutils_spec_1.unused.balanceFee,
                            denom: testutils_spec_1.simapp.denomFee
                        });
                        return [4 /*yield*/, client.bank.balance(testutils_spec_1.unused.address, testutils_spec_1.simapp.denomStaking)];
                    case 3:
                        response2 = _b.sent();
                        expect(response2).toEqual({
                            amount: testutils_spec_1.unused.balanceStaking,
                            denom: testutils_spec_1.simapp.denomStaking
                        });
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("returns zero for non-existent balance", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithBank(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.bank.balance(testutils_spec_1.unused.address, "gintonic")];
                    case 2:
                        response = _b.sent();
                        expect(response).toEqual({
                            amount: "0",
                            denom: "gintonic"
                        });
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("returns zero for non-existent address", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithBank(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.bank.balance(testutils_spec_1.nonExistentAddress, testutils_spec_1.simapp.denomFee)];
                    case 2:
                        response = _b.sent();
                        expect(response).toEqual({
                            amount: "0",
                            denom: testutils_spec_1.simapp.denomFee
                        });
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("allBalances", function () {
        it("returns all balances for unused account", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, balances;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithBank(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.bank.allBalances(testutils_spec_1.unused.address)];
                    case 2:
                        balances = _b.sent();
                        expect(balances).toEqual([
                            {
                                amount: testutils_spec_1.unused.balanceFee,
                                denom: testutils_spec_1.simapp.denomFee
                            },
                            {
                                amount: testutils_spec_1.unused.balanceStaking,
                                denom: testutils_spec_1.simapp.denomStaking
                            },
                        ]);
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("returns an empty list for non-existent account", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, balances;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithBank(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.bank.allBalances(testutils_spec_1.nonExistentAddress)];
                    case 2:
                        balances = _b.sent();
                        expect(balances).toEqual([]);
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("totalSupply", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithBank(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.bank.totalSupply()];
                    case 2:
                        response = _b.sent();
                        expect(response).toEqual([
                            {
                                amount: testutils_spec_1.simapp.totalSupply.toString(),
                                denom: testutils_spec_1.simapp.denomFee
                            },
                            {
                                amount: jasmine.stringMatching(testutils_spec_1.nonNegativeIntegerMatcher),
                                denom: testutils_spec_1.simapp.denomStaking
                            },
                        ]);
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("supplyOf", function () {
        it("works for existing denom", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithBank(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.bank.supplyOf(testutils_spec_1.simapp.denomFee)];
                    case 2:
                        response = _b.sent();
                        expect(response).toEqual({
                            amount: testutils_spec_1.simapp.totalSupply.toString(),
                            denom: testutils_spec_1.simapp.denomFee
                        });
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("returns zero for non-existent denom", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithBank(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.bank.supplyOf("gintonic")];
                    case 2:
                        response = _b.sent();
                        expect(response).toEqual({
                            amount: "0",
                            denom: "gintonic"
                        });
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("denomMetadata", function () {
        it("works for existent denom", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, metadata;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithBank(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.bank.denomMetadata("ucosm")];
                    case 2:
                        metadata = _b.sent();
                        expect(metadata).toEqual({
                            description: "The fee token of this test chain",
                            denomUnits: [
                                {
                                    denom: "ucosm",
                                    exponent: 0,
                                    aliases: []
                                },
                                {
                                    denom: "COSM",
                                    exponent: 6,
                                    aliases: []
                                },
                            ],
                            base: "ucosm",
                            display: "COSM",
                            name: "",
                            symbol: ""
                        });
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("works for non-existent denom", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithBank(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, expectAsync(client.bank.denomMetadata("nothere")).toBeRejectedWithError(/code = NotFound/i)];
                    case 2:
                        _b.sent();
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("denomsMetadata", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, metadatas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithBank(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.bank.denomsMetadata()];
                    case 2:
                        metadatas = _b.sent();
                        expect(metadatas.length).toEqual(1);
                        expect(metadatas[0]).toEqual({
                            description: "The fee token of this test chain",
                            denomUnits: [
                                {
                                    denom: "ucosm",
                                    exponent: 0,
                                    aliases: []
                                },
                                {
                                    denom: "COSM",
                                    exponent: 6,
                                    aliases: []
                                },
                            ],
                            base: "ucosm",
                            display: "COSM",
                            name: "",
                            symbol: ""
                        });
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
