"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
/* eslint-disable @typescript-eslint/naming-convention,no-bitwise */
var amino_1 = require("@cosmjs/amino");
var proto_signing_1 = require("@cosmjs/proto-signing");
var utils_1 = require("@cosmjs/utils");
var tx_1 = require("cosmjs-types/cosmos/bank/v1beta1/tx");
var coin_1 = require("cosmjs-types/cosmos/base/v1beta1/coin");
var tx_2 = require("cosmjs-types/cosmos/staking/v1beta1/tx");
var tx_3 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
var long_1 = require("long");
var minimal_1 = require("protobufjs/minimal");
var aminotypes_1 = require("./aminotypes");
var signingstargateclient_1 = require("./signingstargateclient");
var stargateclient_1 = require("./stargateclient");
var testutils_spec_1 = require("./testutils.spec");
describe("SigningStargateClient", function () {
    describe("constructor", function () {
        it("can be constructed with custom registry", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wallet, registry, options, client, openedClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                    case 1:
                        wallet = _a.sent();
                        registry = new proto_signing_1.Registry();
                        registry.register("/custom.MsgCustom", tx_1.MsgSend);
                        options = __assign(__assign({}, testutils_spec_1.defaultSigningClientOptions), { registry: registry });
                        return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, options)];
                    case 2:
                        client = _a.sent();
                        openedClient = client;
                        expect(openedClient.registry.lookupType("/custom.MsgCustom")).toEqual(tx_1.MsgSend);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("simulate", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wallet, client, msg, msgAny, memo, gasUsed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                    case 1:
                        wallet = _a.sent();
                        return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions)];
                    case 2:
                        client = _a.sent();
                        msg = tx_2.MsgDelegate.fromPartial({
                            delegatorAddress: testutils_spec_1.faucet.address0,
                            validatorAddress: testutils_spec_1.validator.validatorAddress,
                            amount: (0, proto_signing_1.coin)(1234, "ustake")
                        });
                        msgAny = {
                            typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                            value: msg
                        };
                        memo = "Use your power wisely";
                        return [4 /*yield*/, client.simulate(testutils_spec_1.faucet.address0, [msgAny], memo)];
                    case 3:
                        gasUsed = _a.sent();
                        expect(gasUsed).toBeGreaterThanOrEqual(101000);
                        expect(gasUsed).toBeLessThanOrEqual(150000);
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("sendTokens", function () {
        it("works with direct signer", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wallet, client, amount, beneficiaryAddress, memo, before, result, after;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                    case 1:
                        wallet = _a.sent();
                        return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions)];
                    case 2:
                        client = _a.sent();
                        amount = (0, proto_signing_1.coins)(7890, "ucosm");
                        beneficiaryAddress = (0, testutils_spec_1.makeRandomAddress)();
                        memo = "for dinner";
                        return [4 /*yield*/, client.getBalance(beneficiaryAddress, "ucosm")];
                    case 3:
                        before = _a.sent();
                        expect(before).toEqual({
                            denom: "ucosm",
                            amount: "0"
                        });
                        return [4 /*yield*/, client.sendTokens(testutils_spec_1.faucet.address0, beneficiaryAddress, amount, testutils_spec_1.defaultSendFee, memo)];
                    case 4:
                        result = _a.sent();
                        (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                        expect(result.rawLog).toBeTruthy();
                        return [4 /*yield*/, client.getBalance(beneficiaryAddress, "ucosm")];
                    case 5:
                        after = _a.sent();
                        expect(after).toEqual(amount[0]);
                        return [2 /*return*/];
                }
            });
        }); });
        it("works with legacy Amino signer", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wallet, client, amount, beneficiaryAddress, memo, before, result, after;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                    case 1:
                        wallet = _a.sent();
                        return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions)];
                    case 2:
                        client = _a.sent();
                        amount = (0, proto_signing_1.coins)(7890, "ucosm");
                        beneficiaryAddress = (0, testutils_spec_1.makeRandomAddress)();
                        memo = "for dinner";
                        return [4 /*yield*/, client.getBalance(beneficiaryAddress, "ucosm")];
                    case 3:
                        before = _a.sent();
                        expect(before).toEqual({
                            denom: "ucosm",
                            amount: "0"
                        });
                        return [4 /*yield*/, client.sendTokens(testutils_spec_1.faucet.address0, beneficiaryAddress, amount, testutils_spec_1.defaultSendFee, memo)];
                    case 4:
                        result = _a.sent();
                        (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                        expect(result.rawLog).toBeTruthy();
                        return [4 /*yield*/, client.getBalance(beneficiaryAddress, "ucosm")];
                    case 5:
                        after = _a.sent();
                        expect(after).toEqual(amount[0]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("sendIbcTokens", function () {
        it("works with direct signing", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wallet, client, memo, fee, result, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp42)();
                        return [4 /*yield*/, proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                    case 1:
                        wallet = _a.sent();
                        return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions)];
                    case 2:
                        client = _a.sent();
                        memo = "Cross-chain fun";
                        fee = {
                            amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                            gas: "180000"
                        };
                        return [4 /*yield*/, client.sendIbcTokens(testutils_spec_1.faucet.address0, testutils_spec_1.faucet.address1, (0, proto_signing_1.coin)(1234, "ucosm"), "fooPort", "fooChannel", { revisionHeight: long_1["default"].fromNumber(123), revisionNumber: long_1["default"].fromNumber(456) }, Math.floor(Date.now() / 1000) + 60, fee, memo)];
                    case 3:
                        result = _a.sent();
                        // CheckTx must pass but the execution must fail in DeliverTx due to invalid channel/port
                        expect((0, stargateclient_1.isDeliverTxFailure)(result)).toEqual(true);
                        return [4 /*yield*/, client.sendIbcTokens(testutils_spec_1.faucet.address0, testutils_spec_1.faucet.address1, (0, proto_signing_1.coin)(1234, "ucosm"), "fooPort", "fooChannel", undefined, Math.floor(Date.now() / 1000) + 60, fee, memo)];
                    case 4:
                        result = _a.sent();
                        // CheckTx must pass but the execution must fail in DeliverTx due to invalid channel/port
                        expect((0, stargateclient_1.isDeliverTxFailure)(result)).toEqual(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it("works with Amino signing", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wallet, client, memo, fee, result, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp42)();
                        return [4 /*yield*/, amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                    case 1:
                        wallet = _a.sent();
                        return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions)];
                    case 2:
                        client = _a.sent();
                        memo = "Cross-chain fun";
                        fee = {
                            amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                            gas: "180000"
                        };
                        return [4 /*yield*/, client.sendIbcTokens(testutils_spec_1.faucet.address0, testutils_spec_1.faucet.address1, (0, proto_signing_1.coin)(1234, "ucosm"), "fooPort", "fooChannel", { revisionHeight: long_1["default"].fromNumber(123), revisionNumber: long_1["default"].fromNumber(456) }, Math.floor(Date.now() / 1000) + 60, fee, memo)];
                    case 3:
                        result = _a.sent();
                        // CheckTx must pass but the execution must fail in DeliverTx due to invalid channel/port
                        expect((0, stargateclient_1.isDeliverTxFailure)(result)).toEqual(true);
                        return [4 /*yield*/, client.sendIbcTokens(testutils_spec_1.faucet.address0, testutils_spec_1.faucet.address1, (0, proto_signing_1.coin)(1234, "ucosm"), "fooPort", "fooChannel", undefined, Math.floor(Date.now() / 1000) + 60, fee, memo)];
                    case 4:
                        result = _a.sent();
                        // CheckTx must pass but the execution must fail in DeliverTx due to invalid channel/port
                        expect((0, stargateclient_1.isDeliverTxFailure)(result)).toEqual(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("signAndBroadcast", function () {
        describe("direct mode", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var wallet, client, msg, msgAny, fee, memo, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp)();
                            return [4 /*yield*/, proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                        case 1:
                            wallet = _a.sent();
                            return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions)];
                        case 2:
                            client = _a.sent();
                            msg = tx_2.MsgDelegate.fromPartial({
                                delegatorAddress: testutils_spec_1.faucet.address0,
                                validatorAddress: testutils_spec_1.validator.validatorAddress,
                                amount: (0, proto_signing_1.coin)(1234, "ustake")
                            });
                            msgAny = {
                                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                                value: msg
                            };
                            fee = {
                                amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                                gas: "180000"
                            };
                            memo = "Use your power wisely";
                            return [4 /*yield*/, client.signAndBroadcast(testutils_spec_1.faucet.address0, [msgAny], fee, memo)];
                        case 3:
                            result = _a.sent();
                            (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                            expect(result.code).toEqual(0);
                            expect(result.gasWanted).toEqual(180000);
                            expect(result.gasUsed).toBeLessThanOrEqual(180000);
                            expect(result.gasUsed).toBeGreaterThan(100000);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("returns DeliverTxFailure on DeliverTx failure", function () { return __awaiter(void 0, void 0, void 0, function () {
                var wallet, client, msg, msgAny, fee, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp)();
                            return [4 /*yield*/, proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                        case 1:
                            wallet = _a.sent();
                            return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions)];
                        case 2:
                            client = _a.sent();
                            msg = tx_1.MsgSend.fromPartial({
                                fromAddress: testutils_spec_1.faucet.address0,
                                toAddress: (0, testutils_spec_1.makeRandomAddress)(),
                                amount: (0, proto_signing_1.coins)(Number.MAX_SAFE_INTEGER, "ustake")
                            });
                            msgAny = {
                                typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                                value: msg
                            };
                            fee = {
                                amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                                gas: "99000"
                            };
                            return [4 /*yield*/, client.signAndBroadcast(testutils_spec_1.faucet.address0, [msgAny], fee)];
                        case 3:
                            result = _a.sent();
                            (0, stargateclient_1.assertIsDeliverTxFailure)(result);
                            expect(result.code).toBeGreaterThan(0);
                            expect(result.gasWanted).toEqual(99000);
                            expect(result.gasUsed).toBeLessThanOrEqual(99000);
                            expect(result.gasUsed).toBeGreaterThan(40000);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("works with auto gas", function () { return __awaiter(void 0, void 0, void 0, function () {
                var wallet, client, msg, msgAny, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp)();
                            return [4 /*yield*/, proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                        case 1:
                            wallet = _a.sent();
                            return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, __assign(__assign({}, testutils_spec_1.defaultSigningClientOptions), { gasPrice: testutils_spec_1.defaultGasPrice }))];
                        case 2:
                            client = _a.sent();
                            msg = tx_2.MsgDelegate.fromPartial({
                                delegatorAddress: testutils_spec_1.faucet.address0,
                                validatorAddress: testutils_spec_1.validator.validatorAddress,
                                amount: (0, proto_signing_1.coin)(1234, "ustake")
                            });
                            msgAny = {
                                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                                value: msg
                            };
                            return [4 /*yield*/, client.signAndBroadcast(testutils_spec_1.faucet.address0, [msgAny], "auto")];
                        case 3:
                            result = _a.sent();
                            (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("works with a modifying signer", function () { return __awaiter(void 0, void 0, void 0, function () {
                var wallet, client, msg, msgAny, fee, memo, result, searchResult, tx;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp)();
                            return [4 /*yield*/, testutils_spec_1.ModifyingDirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                        case 1:
                            wallet = _a.sent();
                            return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions)];
                        case 2:
                            client = _a.sent();
                            msg = tx_2.MsgDelegate.fromPartial({
                                delegatorAddress: testutils_spec_1.faucet.address0,
                                validatorAddress: testutils_spec_1.validator.validatorAddress,
                                amount: (0, proto_signing_1.coin)(1234, "ustake")
                            });
                            msgAny = {
                                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                                value: msg
                            };
                            fee = {
                                amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                                gas: "180000"
                            };
                            memo = "Use your power wisely";
                            return [4 /*yield*/, client.signAndBroadcast(testutils_spec_1.faucet.address0, [msgAny], fee, memo)];
                        case 3:
                            result = _a.sent();
                            (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                            return [4 /*yield*/, (0, utils_1.sleep)(1000)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, client.getTx(result.transactionHash)];
                        case 5:
                            searchResult = _a.sent();
                            (0, utils_1.assert)(searchResult, "Must find transaction");
                            tx = (0, proto_signing_1.decodeTxRaw)(searchResult.tx);
                            // From ModifyingDirectSecp256k1HdWallet
                            expect(tx.body.memo).toEqual("This was modified");
                            expect(__assign({}, tx.authInfo.fee.amount[0])).toEqual((0, proto_signing_1.coin)(3000, "ucosm"));
                            expect(tx.authInfo.fee.gasLimit.toNumber()).toEqual(333333);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("legacy Amino mode", function () {
            it("works with bank MsgSend", function () { return __awaiter(void 0, void 0, void 0, function () {
                var wallet, client, msgSend, msgAny, fee, memo, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp)();
                            return [4 /*yield*/, amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                        case 1:
                            wallet = _a.sent();
                            return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions)];
                        case 2:
                            client = _a.sent();
                            msgSend = {
                                fromAddress: testutils_spec_1.faucet.address0,
                                toAddress: (0, testutils_spec_1.makeRandomAddress)(),
                                amount: (0, proto_signing_1.coins)(1234, "ucosm")
                            };
                            msgAny = {
                                typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                                value: msgSend
                            };
                            fee = {
                                amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                                gas: "200000"
                            };
                            memo = "Use your tokens wisely";
                            return [4 /*yield*/, client.signAndBroadcast(testutils_spec_1.faucet.address0, [msgAny], fee, memo)];
                        case 3:
                            result = _a.sent();
                            (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("works with staking MsgDelegate", function () { return __awaiter(void 0, void 0, void 0, function () {
                var wallet, client, msgDelegate, msgAny, fee, memo, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp)();
                            return [4 /*yield*/, amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                        case 1:
                            wallet = _a.sent();
                            return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions)];
                        case 2:
                            client = _a.sent();
                            msgDelegate = {
                                delegatorAddress: testutils_spec_1.faucet.address0,
                                validatorAddress: testutils_spec_1.validator.validatorAddress,
                                amount: (0, proto_signing_1.coin)(1234, "ustake")
                            };
                            msgAny = {
                                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                                value: msgDelegate
                            };
                            fee = {
                                amount: (0, proto_signing_1.coins)(2000, "ustake"),
                                gas: "200000"
                            };
                            memo = "Use your tokens wisely";
                            return [4 /*yield*/, client.signAndBroadcast(testutils_spec_1.faucet.address0, [msgAny], fee, memo)];
                        case 3:
                            result = _a.sent();
                            (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("works with a custom registry and custom message", function () { return __awaiter(void 0, void 0, void 0, function () {
                var wallet, customRegistry, msgDelegateTypeUrl, baseCustomMsgDelegate, CustomMsgDelegate, customAminoTypes, options, client, msg, msgAny, fee, memo, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp)();
                            return [4 /*yield*/, amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                        case 1:
                            wallet = _a.sent();
                            customRegistry = new proto_signing_1.Registry();
                            msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";
                            baseCustomMsgDelegate = {
                                customDelegatorAddress: "",
                                customValidatorAddress: ""
                            };
                            CustomMsgDelegate = {
                                // Adapted from autogenerated MsgDelegate implementation
                                encode: function (message, writer) {
                                    var _a, _b;
                                    if (writer === void 0) { writer = minimal_1["default"].Writer.create(); }
                                    writer.uint32(10).string((_a = message.customDelegatorAddress) !== null && _a !== void 0 ? _a : "");
                                    writer.uint32(18).string((_b = message.customValidatorAddress) !== null && _b !== void 0 ? _b : "");
                                    if (message.customAmount !== undefined && message.customAmount !== undefined) {
                                        coin_1.Coin.encode(message.customAmount, writer.uint32(26).fork()).ldelim();
                                    }
                                    return writer;
                                },
                                decode: function () {
                                    throw new Error("decode method should not be required");
                                },
                                fromJSON: function () {
                                    throw new Error("fromJSON method should not be required");
                                },
                                fromPartial: function (object) {
                                    var message = __assign({}, baseCustomMsgDelegate);
                                    if (object.customDelegatorAddress !== undefined && object.customDelegatorAddress !== null) {
                                        message.customDelegatorAddress = object.customDelegatorAddress;
                                    }
                                    else {
                                        message.customDelegatorAddress = "";
                                    }
                                    if (object.customValidatorAddress !== undefined && object.customValidatorAddress !== null) {
                                        message.customValidatorAddress = object.customValidatorAddress;
                                    }
                                    else {
                                        message.customValidatorAddress = "";
                                    }
                                    if (object.customAmount !== undefined && object.customAmount !== null) {
                                        message.customAmount = coin_1.Coin.fromPartial(object.customAmount);
                                    }
                                    else {
                                        message.customAmount = undefined;
                                    }
                                    return message;
                                },
                                toJSON: function () {
                                    throw new Error("toJSON method should not be required");
                                }
                            };
                            customRegistry.register(msgDelegateTypeUrl, CustomMsgDelegate);
                            customAminoTypes = new aminotypes_1.AminoTypes({
                                additions: {
                                    "/cosmos.staking.v1beta1.MsgDelegate": {
                                        aminoType: "cosmos-sdk/MsgDelegate",
                                        toAmino: function (_a) {
                                            var customDelegatorAddress = _a.customDelegatorAddress, customValidatorAddress = _a.customValidatorAddress, customAmount = _a.customAmount;
                                            (0, utils_1.assert)(customDelegatorAddress, "missing customDelegatorAddress");
                                            (0, utils_1.assert)(customValidatorAddress, "missing validatorAddress");
                                            (0, utils_1.assert)(customAmount, "missing amount");
                                            return {
                                                delegator_address: customDelegatorAddress,
                                                validator_address: customValidatorAddress,
                                                amount: {
                                                    amount: customAmount.amount,
                                                    denom: customAmount.denom
                                                }
                                            };
                                        },
                                        fromAmino: function (_a) {
                                            var delegator_address = _a.delegator_address, validator_address = _a.validator_address, amount = _a.amount;
                                            return ({
                                                customDelegatorAddress: delegator_address,
                                                customValidatorAddress: validator_address,
                                                customAmount: coin_1.Coin.fromPartial(amount)
                                            });
                                        }
                                    }
                                }
                            });
                            options = __assign(__assign({}, testutils_spec_1.defaultSigningClientOptions), { registry: customRegistry, aminoTypes: customAminoTypes });
                            return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, options)];
                        case 2:
                            client = _a.sent();
                            msg = {
                                customDelegatorAddress: testutils_spec_1.faucet.address0,
                                customValidatorAddress: testutils_spec_1.validator.validatorAddress,
                                customAmount: (0, proto_signing_1.coin)(1234, "ustake")
                            };
                            msgAny = {
                                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                                value: msg
                            };
                            fee = {
                                amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                                gas: "200000"
                            };
                            memo = "Use your power wisely";
                            return [4 /*yield*/, client.signAndBroadcast(testutils_spec_1.faucet.address0, [msgAny], fee, memo)];
                        case 3:
                            result = _a.sent();
                            (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("works with a modifying signer", function () { return __awaiter(void 0, void 0, void 0, function () {
                var wallet, client, msg, msgAny, fee, memo, result, searchResult, tx;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp)();
                            return [4 /*yield*/, testutils_spec_1.ModifyingSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                        case 1:
                            wallet = _a.sent();
                            return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions)];
                        case 2:
                            client = _a.sent();
                            msg = {
                                delegatorAddress: testutils_spec_1.faucet.address0,
                                validatorAddress: testutils_spec_1.validator.validatorAddress,
                                amount: (0, proto_signing_1.coin)(1234, "ustake")
                            };
                            msgAny = {
                                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                                value: msg
                            };
                            fee = {
                                amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                                gas: "200000"
                            };
                            memo = "Use your power wisely";
                            return [4 /*yield*/, client.signAndBroadcast(testutils_spec_1.faucet.address0, [msgAny], fee, memo)];
                        case 3:
                            result = _a.sent();
                            (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                            return [4 /*yield*/, (0, utils_1.sleep)(1000)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, client.getTx(result.transactionHash)];
                        case 5:
                            searchResult = _a.sent();
                            (0, utils_1.assert)(searchResult, "Must find transaction");
                            tx = (0, proto_signing_1.decodeTxRaw)(searchResult.tx);
                            // From ModifyingSecp256k1HdWallet
                            expect(tx.body.memo).toEqual("This was modified");
                            expect(__assign({}, tx.authInfo.fee.amount[0])).toEqual((0, proto_signing_1.coin)(3000, "ucosm"));
                            expect(tx.authInfo.fee.gasLimit.toNumber()).toEqual(333333);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe("sign", function () {
        describe("direct mode", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var wallet, client, msg, msgAny, fee, memo, signed, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp)();
                            return [4 /*yield*/, proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                        case 1:
                            wallet = _a.sent();
                            return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions)];
                        case 2:
                            client = _a.sent();
                            msg = tx_2.MsgDelegate.fromPartial({
                                delegatorAddress: testutils_spec_1.faucet.address0,
                                validatorAddress: testutils_spec_1.validator.validatorAddress,
                                amount: (0, proto_signing_1.coin)(1234, "ustake")
                            });
                            msgAny = {
                                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                                value: msg
                            };
                            fee = {
                                amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                                gas: "180000"
                            };
                            memo = "Use your power wisely";
                            return [4 /*yield*/, client.sign(testutils_spec_1.faucet.address0, [msgAny], fee, memo)];
                        case 3:
                            signed = _a.sent();
                            return [4 /*yield*/, client.broadcastTx(Uint8Array.from(tx_3.TxRaw.encode(signed).finish()))];
                        case 4:
                            result = _a.sent();
                            (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("works with a modifying signer", function () { return __awaiter(void 0, void 0, void 0, function () {
                var wallet, client, msg, msgAny, fee, memo, signed, body, authInfo, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp)();
                            return [4 /*yield*/, testutils_spec_1.ModifyingDirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                        case 1:
                            wallet = _a.sent();
                            return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions)];
                        case 2:
                            client = _a.sent();
                            msg = tx_2.MsgDelegate.fromPartial({
                                delegatorAddress: testutils_spec_1.faucet.address0,
                                validatorAddress: testutils_spec_1.validator.validatorAddress,
                                amount: (0, proto_signing_1.coin)(1234, "ustake")
                            });
                            msgAny = {
                                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                                value: msg
                            };
                            fee = {
                                amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                                gas: "180000"
                            };
                            memo = "Use your power wisely";
                            return [4 /*yield*/, client.sign(testutils_spec_1.faucet.address0, [msgAny], fee, memo)];
                        case 3:
                            signed = _a.sent();
                            body = tx_3.TxBody.decode(signed.bodyBytes);
                            authInfo = tx_3.AuthInfo.decode(signed.authInfoBytes);
                            // From ModifyingDirectSecp256k1HdWallet
                            expect(body.memo).toEqual("This was modified");
                            expect(__assign({}, authInfo.fee.amount[0])).toEqual((0, proto_signing_1.coin)(3000, "ucosm"));
                            expect(authInfo.fee.gasLimit.toNumber()).toEqual(333333);
                            return [4 /*yield*/, client.broadcastTx(Uint8Array.from(tx_3.TxRaw.encode(signed).finish()))];
                        case 4:
                            result = _a.sent();
                            (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("legacy Amino mode", function () {
            it("works with bank MsgSend", function () { return __awaiter(void 0, void 0, void 0, function () {
                var wallet, client, msgSend, msgAny, fee, memo, signed, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp)();
                            return [4 /*yield*/, amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                        case 1:
                            wallet = _a.sent();
                            return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions)];
                        case 2:
                            client = _a.sent();
                            msgSend = {
                                fromAddress: testutils_spec_1.faucet.address0,
                                toAddress: (0, testutils_spec_1.makeRandomAddress)(),
                                amount: (0, proto_signing_1.coins)(1234, "ucosm")
                            };
                            msgAny = {
                                typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                                value: msgSend
                            };
                            fee = {
                                amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                                gas: "200000"
                            };
                            memo = "Use your tokens wisely";
                            return [4 /*yield*/, client.sign(testutils_spec_1.faucet.address0, [msgAny], fee, memo)];
                        case 3:
                            signed = _a.sent();
                            return [4 /*yield*/, client.broadcastTx(Uint8Array.from(tx_3.TxRaw.encode(signed).finish()))];
                        case 4:
                            result = _a.sent();
                            (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("works with staking MsgDelegate", function () { return __awaiter(void 0, void 0, void 0, function () {
                var wallet, client, msgDelegate, msgAny, fee, memo, signed, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp)();
                            return [4 /*yield*/, amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                        case 1:
                            wallet = _a.sent();
                            return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions)];
                        case 2:
                            client = _a.sent();
                            msgDelegate = {
                                delegatorAddress: testutils_spec_1.faucet.address0,
                                validatorAddress: testutils_spec_1.validator.validatorAddress,
                                amount: (0, proto_signing_1.coin)(1234, "ustake")
                            };
                            msgAny = {
                                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                                value: msgDelegate
                            };
                            fee = {
                                amount: (0, proto_signing_1.coins)(2000, "ustake"),
                                gas: "200000"
                            };
                            memo = "Use your tokens wisely";
                            return [4 /*yield*/, client.sign(testutils_spec_1.faucet.address0, [msgAny], fee, memo)];
                        case 3:
                            signed = _a.sent();
                            return [4 /*yield*/, client.broadcastTx(Uint8Array.from(tx_3.TxRaw.encode(signed).finish()))];
                        case 4:
                            result = _a.sent();
                            (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("works with a custom registry and custom message", function () { return __awaiter(void 0, void 0, void 0, function () {
                var wallet, customRegistry, msgDelegateTypeUrl, baseCustomMsgDelegate, CustomMsgDelegate, customAminoTypes, options, client, msg, msgAny, fee, memo, signed, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp)();
                            return [4 /*yield*/, amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                        case 1:
                            wallet = _a.sent();
                            customRegistry = new proto_signing_1.Registry();
                            msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";
                            baseCustomMsgDelegate = {
                                customDelegatorAddress: "",
                                customValidatorAddress: ""
                            };
                            CustomMsgDelegate = {
                                // Adapted from autogenerated MsgDelegate implementation
                                encode: function (message, writer) {
                                    var _a, _b;
                                    if (writer === void 0) { writer = minimal_1["default"].Writer.create(); }
                                    writer.uint32(10).string((_a = message.customDelegatorAddress) !== null && _a !== void 0 ? _a : "");
                                    writer.uint32(18).string((_b = message.customValidatorAddress) !== null && _b !== void 0 ? _b : "");
                                    if (message.customAmount !== undefined && message.customAmount !== undefined) {
                                        coin_1.Coin.encode(message.customAmount, writer.uint32(26).fork()).ldelim();
                                    }
                                    return writer;
                                },
                                decode: function () {
                                    throw new Error("decode method should not be required");
                                },
                                fromJSON: function () {
                                    throw new Error("fromJSON method should not be required");
                                },
                                fromPartial: function (object) {
                                    var message = __assign({}, baseCustomMsgDelegate);
                                    if (object.customDelegatorAddress !== undefined && object.customDelegatorAddress !== null) {
                                        message.customDelegatorAddress = object.customDelegatorAddress;
                                    }
                                    else {
                                        message.customDelegatorAddress = "";
                                    }
                                    if (object.customValidatorAddress !== undefined && object.customValidatorAddress !== null) {
                                        message.customValidatorAddress = object.customValidatorAddress;
                                    }
                                    else {
                                        message.customValidatorAddress = "";
                                    }
                                    if (object.customAmount !== undefined && object.customAmount !== null) {
                                        message.customAmount = coin_1.Coin.fromPartial(object.customAmount);
                                    }
                                    else {
                                        message.customAmount = undefined;
                                    }
                                    return message;
                                },
                                toJSON: function () {
                                    throw new Error("toJSON method should not be required");
                                }
                            };
                            customRegistry.register(msgDelegateTypeUrl, CustomMsgDelegate);
                            customAminoTypes = new aminotypes_1.AminoTypes({
                                additions: {
                                    "/cosmos.staking.v1beta1.MsgDelegate": {
                                        aminoType: "cosmos-sdk/MsgDelegate",
                                        toAmino: function (_a) {
                                            var customDelegatorAddress = _a.customDelegatorAddress, customValidatorAddress = _a.customValidatorAddress, customAmount = _a.customAmount;
                                            (0, utils_1.assert)(customDelegatorAddress, "missing customDelegatorAddress");
                                            (0, utils_1.assert)(customValidatorAddress, "missing validatorAddress");
                                            (0, utils_1.assert)(customAmount, "missing amount");
                                            return {
                                                delegator_address: customDelegatorAddress,
                                                validator_address: customValidatorAddress,
                                                amount: {
                                                    amount: customAmount.amount,
                                                    denom: customAmount.denom
                                                }
                                            };
                                        },
                                        fromAmino: function (_a) {
                                            var delegator_address = _a.delegator_address, validator_address = _a.validator_address, amount = _a.amount;
                                            return ({
                                                customDelegatorAddress: delegator_address,
                                                customValidatorAddress: validator_address,
                                                customAmount: coin_1.Coin.fromPartial(amount)
                                            });
                                        }
                                    }
                                }
                            });
                            options = __assign(__assign({}, testutils_spec_1.defaultSigningClientOptions), { registry: customRegistry, aminoTypes: customAminoTypes });
                            return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, options)];
                        case 2:
                            client = _a.sent();
                            msg = {
                                customDelegatorAddress: testutils_spec_1.faucet.address0,
                                customValidatorAddress: testutils_spec_1.validator.validatorAddress,
                                customAmount: (0, proto_signing_1.coin)(1234, "ustake")
                            };
                            msgAny = {
                                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                                value: msg
                            };
                            fee = {
                                amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                                gas: "200000"
                            };
                            memo = "Use your power wisely";
                            return [4 /*yield*/, client.sign(testutils_spec_1.faucet.address0, [msgAny], fee, memo)];
                        case 3:
                            signed = _a.sent();
                            return [4 /*yield*/, client.broadcastTx(Uint8Array.from(tx_3.TxRaw.encode(signed).finish()))];
                        case 4:
                            result = _a.sent();
                            (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("works with a modifying signer", function () { return __awaiter(void 0, void 0, void 0, function () {
                var wallet, client, msg, msgAny, fee, memo, signed, body, authInfo, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp)();
                            return [4 /*yield*/, testutils_spec_1.ModifyingSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                        case 1:
                            wallet = _a.sent();
                            return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions)];
                        case 2:
                            client = _a.sent();
                            msg = {
                                delegatorAddress: testutils_spec_1.faucet.address0,
                                validatorAddress: testutils_spec_1.validator.validatorAddress,
                                amount: (0, proto_signing_1.coin)(1234, "ustake")
                            };
                            msgAny = {
                                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                                value: msg
                            };
                            fee = {
                                amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                                gas: "200000"
                            };
                            memo = "Use your power wisely";
                            return [4 /*yield*/, client.sign(testutils_spec_1.faucet.address0, [msgAny], fee, memo)];
                        case 3:
                            signed = _a.sent();
                            body = tx_3.TxBody.decode(signed.bodyBytes);
                            authInfo = tx_3.AuthInfo.decode(signed.authInfoBytes);
                            // From ModifyingSecp256k1HdWallet
                            expect(body.memo).toEqual("This was modified");
                            expect(__assign({}, authInfo.fee.amount[0])).toEqual((0, proto_signing_1.coin)(3000, "ucosm"));
                            expect(authInfo.fee.gasLimit.toNumber()).toEqual(333333);
                            return [4 /*yield*/, client.broadcastTx(Uint8Array.from(tx_3.TxRaw.encode(signed).finish()))];
                        case 4:
                            result = _a.sent();
                            (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
