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
var encoding_1 = require("@cosmjs/encoding");
var proto_signing_1 = require("@cosmjs/proto-signing");
var utils_1 = require("@cosmjs/utils");
var tx_1 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
var encodeobjects_1 = require("./encodeobjects");
var stargateclient_1 = require("./stargateclient");
var testutils_spec_1 = require("./testutils.spec");
function sendTokens(client, registry, wallet, recipient, amount, memo) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, walletAddress, pubkeyBytes, pubkey, txBodyFields, txBodyBytes, _b, accountNumber, sequence, feeAmount, gasLimit, authInfoBytes, chainId, signDoc, signature, txRaw, txRawBytes, broadcastResponse;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, wallet.getAccounts()];
                case 1:
                    _a = (_c.sent())[0], walletAddress = _a.address, pubkeyBytes = _a.pubkey;
                    pubkey = (0, proto_signing_1.encodePubkey)({
                        type: "tendermint/PubKeySecp256k1",
                        value: (0, encoding_1.toBase64)(pubkeyBytes)
                    });
                    txBodyFields = {
                        typeUrl: "/cosmos.tx.v1beta1.TxBody",
                        value: {
                            messages: [
                                {
                                    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                                    value: {
                                        fromAddress: walletAddress,
                                        toAddress: recipient,
                                        amount: amount
                                    }
                                },
                            ],
                            memo: memo
                        }
                    };
                    txBodyBytes = registry.encode(txBodyFields);
                    return [4 /*yield*/, client.getSequence(walletAddress)];
                case 2:
                    _b = (_c.sent()), accountNumber = _b.accountNumber, sequence = _b.sequence;
                    feeAmount = [
                        {
                            amount: "2000",
                            denom: "ucosm"
                        },
                    ];
                    gasLimit = 200000;
                    authInfoBytes = (0, proto_signing_1.makeAuthInfoBytes)([{ pubkey: pubkey, sequence: sequence }], feeAmount, gasLimit);
                    return [4 /*yield*/, client.getChainId()];
                case 3:
                    chainId = _c.sent();
                    signDoc = (0, proto_signing_1.makeSignDoc)(txBodyBytes, authInfoBytes, chainId, accountNumber);
                    return [4 /*yield*/, wallet.signDirect(walletAddress, signDoc)];
                case 4:
                    signature = (_c.sent()).signature;
                    txRaw = tx_1.TxRaw.fromPartial({
                        bodyBytes: txBodyBytes,
                        authInfoBytes: authInfoBytes,
                        signatures: [(0, encoding_1.fromBase64)(signature.signature)]
                    });
                    txRawBytes = Uint8Array.from(tx_1.TxRaw.encode(txRaw).finish());
                    return [4 /*yield*/, client.broadcastTx(txRawBytes, testutils_spec_1.defaultSigningClientOptions.broadcastTimeoutMs, testutils_spec_1.defaultSigningClientOptions.broadcastPollIntervalMs)];
                case 5:
                    broadcastResponse = _c.sent();
                    return [2 /*return*/, {
                            broadcastResponse: broadcastResponse,
                            tx: txRawBytes
                        }];
            }
        });
    });
}
describe("StargateClient.getTx and .searchTx", function () {
    var registry = new proto_signing_1.Registry();
    var sendUnsuccessful;
    var sendSuccessful;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var wallet, client, unsuccessfulRecipient, successfulRecipient, unsuccessfulResult, successfulResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(0, testutils_spec_1.simappEnabled)()) return [3 /*break*/, 6];
                    return [4 /*yield*/, proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                case 1:
                    wallet = _a.sent();
                    return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                case 2:
                    client = _a.sent();
                    unsuccessfulRecipient = (0, testutils_spec_1.makeRandomAddress)();
                    successfulRecipient = (0, testutils_spec_1.makeRandomAddress)();
                    return [4 /*yield*/, sendTokens(client, registry, wallet, unsuccessfulRecipient, (0, proto_signing_1.coins)(123456700000000, "ucosm"), "Sending more than I can afford")];
                case 3:
                    unsuccessfulResult = _a.sent();
                    if ((0, stargateclient_1.isDeliverTxFailure)(unsuccessfulResult.broadcastResponse)) {
                        sendUnsuccessful = {
                            sender: testutils_spec_1.faucet.address0,
                            recipient: unsuccessfulRecipient,
                            hash: unsuccessfulResult.broadcastResponse.transactionHash,
                            height: unsuccessfulResult.broadcastResponse.height,
                            tx: unsuccessfulResult.tx
                        };
                    }
                    return [4 /*yield*/, sendTokens(client, registry, wallet, successfulRecipient, (0, proto_signing_1.coins)(1234567, "ucosm"), "Something I can afford")];
                case 4:
                    successfulResult = _a.sent();
                    if ((0, stargateclient_1.isDeliverTxSuccess)(successfulResult.broadcastResponse)) {
                        sendSuccessful = {
                            sender: testutils_spec_1.faucet.address0,
                            recipient: successfulRecipient,
                            hash: successfulResult.broadcastResponse.transactionHash,
                            height: successfulResult.broadcastResponse.height,
                            tx: successfulResult.tx
                        };
                    }
                    return [4 /*yield*/, (0, utils_1.sleep)(75)];
                case 5:
                    _a.sent(); // wait until transactions are indexed
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); });
    describe("getTx", function () {
        it("can get successful tx by ID", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        (0, utils_1.assert)(sendSuccessful, "value must be set in beforeAll()");
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.getTx(sendSuccessful.hash)];
                    case 2:
                        result = _a.sent();
                        expect(result).toEqual(jasmine.objectContaining({
                            height: sendSuccessful.height,
                            hash: sendSuccessful.hash,
                            code: 0,
                            tx: sendSuccessful.tx
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
        it("can get unsuccessful tx by ID", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        (0, utils_1.assert)(sendUnsuccessful, "value must be set in beforeAll()");
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.getTx(sendUnsuccessful.hash)];
                    case 2:
                        result = _a.sent();
                        expect(result).toEqual(jasmine.objectContaining({
                            height: sendUnsuccessful.height,
                            hash: sendUnsuccessful.hash,
                            code: 5,
                            tx: sendUnsuccessful.tx
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
        it("can get by ID (non existent)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, nonExistentId, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        nonExistentId = "0000000000000000000000000000000000000000000000000000000000000000";
                        return [4 /*yield*/, client.getTx(nonExistentId)];
                    case 2:
                        result = _a.sent();
                        expect(result).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("with SearchByHeightQuery", function () {
        it("can search successful tx by height", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        (0, utils_1.assert)(sendSuccessful, "value must be set in beforeAll()");
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.searchTx({ height: sendSuccessful.height })];
                    case 2:
                        result = _a.sent();
                        expect(result.length).toBeGreaterThanOrEqual(1);
                        expect(result).toContain(jasmine.objectContaining({
                            height: sendSuccessful.height,
                            hash: sendSuccessful.hash,
                            code: 0,
                            tx: sendSuccessful.tx
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
        it("can search unsuccessful tx by height", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        (0, utils_1.assert)(sendUnsuccessful, "value must be set in beforeAll()");
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.searchTx({ height: sendUnsuccessful.height })];
                    case 2:
                        result = _a.sent();
                        expect(result.length).toBeGreaterThanOrEqual(1);
                        expect(result).toContain(jasmine.objectContaining({
                            height: sendUnsuccessful.height,
                            hash: sendUnsuccessful.hash,
                            code: 5,
                            tx: sendUnsuccessful.tx
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("with SearchBySentFromOrToQuery", function () {
        it("can search by sender", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, results, _i, results_1, result, tx, filteredMsgs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        (0, utils_1.assert)(sendSuccessful, "value must be set in beforeAll()");
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.searchTx({ sentFromOrTo: sendSuccessful.sender })];
                    case 2:
                        results = _a.sent();
                        expect(results.length).toBeGreaterThanOrEqual(1);
                        // Check basic structure of all results
                        for (_i = 0, results_1 = results; _i < results_1.length; _i++) {
                            result = results_1[_i];
                            tx = (0, proto_signing_1.decodeTxRaw)(result.tx);
                            filteredMsgs = tx.body.messages.filter(function (msg) {
                                if (!(0, encodeobjects_1.isMsgSendEncodeObject)(msg))
                                    return false;
                                var decoded = registry.decode(msg);
                                return decoded.fromAddress === (sendSuccessful === null || sendSuccessful === void 0 ? void 0 : sendSuccessful.sender);
                            });
                            expect(filteredMsgs.length).toBeGreaterThanOrEqual(1);
                        }
                        // Check details of most recent result
                        expect(results[results.length - 1]).toEqual(jasmine.objectContaining({
                            height: sendSuccessful.height,
                            hash: sendSuccessful.hash,
                            tx: sendSuccessful.tx
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
        it("can search by recipient", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, results, _i, results_2, result, tx, filteredMsgs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        (0, utils_1.assert)(sendSuccessful, "value must be set in beforeAll()");
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.searchTx({ sentFromOrTo: sendSuccessful.recipient })];
                    case 2:
                        results = _a.sent();
                        expect(results.length).toBeGreaterThanOrEqual(1);
                        // Check basic structure of all results
                        for (_i = 0, results_2 = results; _i < results_2.length; _i++) {
                            result = results_2[_i];
                            tx = (0, proto_signing_1.decodeTxRaw)(result.tx);
                            filteredMsgs = tx.body.messages.filter(function (msg) {
                                if (!(0, encodeobjects_1.isMsgSendEncodeObject)(msg))
                                    return false;
                                var decoded = registry.decode(msg);
                                return decoded.toAddress === (sendSuccessful === null || sendSuccessful === void 0 ? void 0 : sendSuccessful.recipient);
                            });
                            expect(filteredMsgs.length).toBeGreaterThanOrEqual(1);
                        }
                        // Check details of most recent result
                        expect(results[results.length - 1]).toEqual(jasmine.objectContaining({
                            height: sendSuccessful.height,
                            hash: sendSuccessful.hash,
                            tx: sendSuccessful.tx
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
        it("can search by recipient and filter by minHeight", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, query, result, result, result, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        (0, utils_1.assert)(sendSuccessful);
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        query = { sentFromOrTo: sendSuccessful.recipient };
                        return [4 /*yield*/, client.searchTx(query, { minHeight: 0 })];
                    case 2:
                        result = _a.sent();
                        expect(result.length).toEqual(1);
                        return [4 /*yield*/, client.searchTx(query, { minHeight: sendSuccessful.height - 1 })];
                    case 3:
                        result = _a.sent();
                        expect(result.length).toEqual(1);
                        return [4 /*yield*/, client.searchTx(query, { minHeight: sendSuccessful.height })];
                    case 4:
                        result = _a.sent();
                        expect(result.length).toEqual(1);
                        return [4 /*yield*/, client.searchTx(query, { minHeight: sendSuccessful.height + 1 })];
                    case 5:
                        result = _a.sent();
                        expect(result.length).toEqual(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it("can search by recipient and filter by maxHeight", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, query, result, result, result, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        (0, utils_1.assert)(sendSuccessful);
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        query = { sentFromOrTo: sendSuccessful.recipient };
                        return [4 /*yield*/, client.searchTx(query, { maxHeight: 9999999999999 })];
                    case 2:
                        result = _a.sent();
                        expect(result.length).toEqual(1);
                        return [4 /*yield*/, client.searchTx(query, { maxHeight: sendSuccessful.height + 1 })];
                    case 3:
                        result = _a.sent();
                        expect(result.length).toEqual(1);
                        return [4 /*yield*/, client.searchTx(query, { maxHeight: sendSuccessful.height })];
                    case 4:
                        result = _a.sent();
                        expect(result.length).toEqual(1);
                        return [4 /*yield*/, client.searchTx(query, { maxHeight: sendSuccessful.height - 1 })];
                    case 5:
                        result = _a.sent();
                        expect(result.length).toEqual(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("with SearchByTagsQuery", function () {
        it("can search by transfer.recipient", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, results, _i, results_3, result, tx, msg, decoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        (0, utils_1.assert)(sendSuccessful, "value must be set in beforeAll()");
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.searchTx({
                                tags: [{ key: "transfer.recipient", value: sendSuccessful.recipient }]
                            })];
                    case 2:
                        results = _a.sent();
                        expect(results.length).toBeGreaterThanOrEqual(1);
                        // Check basic structure of all results
                        for (_i = 0, results_3 = results; _i < results_3.length; _i++) {
                            result = results_3[_i];
                            tx = (0, proto_signing_1.decodeTxRaw)(result.tx);
                            msg = (0, testutils_spec_1.fromOneElementArray)(tx.body.messages);
                            expect(msg.typeUrl).toEqual("/cosmos.bank.v1beta1.MsgSend");
                            decoded = registry.decode(msg);
                            expect(decoded.toAddress).toEqual(sendSuccessful.recipient);
                        }
                        // Check details of most recent result
                        expect(results[results.length - 1]).toEqual(jasmine.objectContaining({
                            height: sendSuccessful.height,
                            hash: sendSuccessful.hash,
                            tx: sendSuccessful.tx
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
