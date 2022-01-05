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
var encoding_1 = require("@cosmjs/encoding");
var proto_signing_1 = require("@cosmjs/proto-signing");
var utils_1 = require("@cosmjs/utils");
var tx_1 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
var readonly_date_1 = require("readonly-date");
var stargateclient_1 = require("./stargateclient");
var testutils_spec_1 = require("./testutils.spec");
var resultFailure = {
    code: 5,
    height: 219901,
    rawLog: "failed to execute message; message index: 0: 1855527000ufct is smaller than 20000000000000000000000ufct: insufficient funds",
    transactionHash: "FDC4FB701AABD465935F7D04AE490D1EF5F2BD4B227601C4E98B57EB077D9B7D",
    gasUsed: 54396,
    gasWanted: 200000
};
var resultSuccess = {
    code: 0,
    height: 219894,
    rawLog: '[{"events":[{"type":"message","attributes":[{"key":"action","value":"send"},{"key":"sender","value":"firma1trqyle9m2nvyafc2n25frkpwed2504y6avgfzr"},{"key":"module","value":"bank"}]},{"type":"transfer","attributes":[{"key":"recipient","value":"firma12er8ls2sf5zess3jgjxz59xat9xtf8hz0hk6n4"},{"key":"sender","value":"firma1trqyle9m2nvyafc2n25frkpwed2504y6avgfzr"},{"key":"amount","value":"2000000ufct"}]}]}]',
    transactionHash: "C0B416CA868C55C2B8C1BBB8F3CFA233854F13A5CB15D3E9599F50CAF7B3D161",
    gasUsed: 61556,
    gasWanted: 200000
};
describe("isDeliverTxFailure", function () {
    it("works", function () {
        expect((0, stargateclient_1.isDeliverTxFailure)(resultFailure)).toEqual(true);
        expect((0, stargateclient_1.isDeliverTxFailure)(resultSuccess)).toEqual(false);
    });
});
describe("isDeliverTxSuccess", function () {
    it("works", function () {
        expect((0, stargateclient_1.isDeliverTxSuccess)(resultFailure)).toEqual(false);
        expect((0, stargateclient_1.isDeliverTxSuccess)(resultSuccess)).toEqual(true);
    });
});
describe("StargateClient", function () {
    describe("connect", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        expect(client).toBeTruthy();
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("getChainId", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _b.sent();
                        _a = expect;
                        return [4 /*yield*/, client.getChainId()];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).toEqual(testutils_spec_1.simapp.chainId);
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("caches chain ID", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, openedClient, getCodeSpy, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _c.sent();
                        openedClient = client;
                        getCodeSpy = spyOn(openedClient.tmClient, "status").and.callThrough();
                        _a = expect;
                        return [4 /*yield*/, client.getChainId()];
                    case 2:
                        _a.apply(void 0, [_c.sent()]).toEqual(testutils_spec_1.simapp.chainId); // from network
                        _b = expect;
                        return [4 /*yield*/, client.getChainId()];
                    case 3:
                        _b.apply(void 0, [_c.sent()]).toEqual(testutils_spec_1.simapp.chainId); // from cache
                        expect(getCodeSpy).toHaveBeenCalledTimes(1);
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("getHeight", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, height1, height2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.getHeight()];
                    case 2:
                        height1 = _a.sent();
                        expect(height1).toBeGreaterThan(0);
                        return [4 /*yield*/, (0, utils_1.sleep)(testutils_spec_1.simapp.blockTime * 1.4)];
                    case 3:
                        _a.sent(); // tolerate chain being 40% slower than expected
                        return [4 /*yield*/, client.getHeight()];
                    case 4:
                        height2 = _a.sent();
                        expect(height2).toBeGreaterThanOrEqual(height1 + 1);
                        expect(height2).toBeLessThanOrEqual(height1 + 2);
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("getAccount", function () {
        it("works for unused account", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.getAccount(testutils_spec_1.unused.address)];
                    case 2:
                        account = _a.sent();
                        (0, utils_1.assert)(account);
                        expect(account).toEqual({
                            address: testutils_spec_1.unused.address,
                            pubkey: null,
                            accountNumber: testutils_spec_1.unused.accountNumber,
                            sequence: testutils_spec_1.unused.sequence
                        });
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("works for account with pubkey and non-zero sequence", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.getAccount(testutils_spec_1.validator.delegatorAddress)];
                    case 2:
                        account = _a.sent();
                        (0, utils_1.assert)(account);
                        expect(account).toEqual({
                            address: testutils_spec_1.validator.delegatorAddress,
                            pubkey: testutils_spec_1.validator.pubkey,
                            accountNumber: testutils_spec_1.validator.accountNumber,
                            sequence: testutils_spec_1.validator.sequence
                        });
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("returns null for non-existent address", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.getAccount(testutils_spec_1.nonExistentAddress)];
                    case 2:
                        account = _a.sent();
                        expect(account).toBeNull();
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("getSequence", function () {
        it("works for unused account", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.getSequence(testutils_spec_1.unused.address)];
                    case 2:
                        account = _a.sent();
                        (0, utils_1.assert)(account);
                        expect(account).toEqual({
                            accountNumber: testutils_spec_1.unused.accountNumber,
                            sequence: testutils_spec_1.unused.sequence
                        });
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("rejects for non-existent address", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, expectAsync(client.getSequence(testutils_spec_1.nonExistentAddress)).toBeRejectedWithError(/account does not exist on chain/i)];
                    case 2:
                        _a.sent();
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("getBlock", function () {
        it("works for latest block", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, response, _a, _b, _c, _d, _e, _f;
            var _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _j.sent();
                        return [4 /*yield*/, client.getBlock()];
                    case 2:
                        response = _j.sent();
                        _b = (_a = expect(response)).toEqual;
                        _d = (_c = jasmine).objectContaining;
                        _g = {
                            id: jasmine.stringMatching(testutils_spec_1.tendermintIdMatcher)
                        };
                        _f = (_e = jasmine).objectContaining;
                        _h = {};
                        return [4 /*yield*/, client.getChainId()];
                    case 3:
                        _b.apply(_a, [_d.apply(_c, [(_g.header = _f.apply(_e, [(_h.chainId = _j.sent(),
                                        _h)]),
                                    _g.txs = jasmine.arrayContaining([]),
                                    _g)])]);
                        expect(response.header.height).toBeGreaterThanOrEqual(1);
                        expect(new readonly_date_1.ReadonlyDate(response.header.time).getTime()).toBeLessThan(readonly_date_1.ReadonlyDate.now());
                        expect(new readonly_date_1.ReadonlyDate(response.header.time).getTime()).toBeGreaterThanOrEqual(readonly_date_1.ReadonlyDate.now() - 5000);
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("works for block by height", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, height, response, _a, _b, _c, _d, _e, _f;
            var _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _j.sent();
                        return [4 /*yield*/, client.getBlock()];
                    case 2:
                        height = (_j.sent()).header.height;
                        return [4 /*yield*/, client.getBlock(height - 1)];
                    case 3:
                        response = _j.sent();
                        _b = (_a = expect(response)).toEqual;
                        _d = (_c = jasmine).objectContaining;
                        _g = {
                            id: jasmine.stringMatching(testutils_spec_1.tendermintIdMatcher)
                        };
                        _f = (_e = jasmine).objectContaining;
                        _h = {
                            height: height - 1
                        };
                        return [4 /*yield*/, client.getChainId()];
                    case 4:
                        _b.apply(_a, [_d.apply(_c, [(_g.header = _f.apply(_e, [(_h.chainId = _j.sent(),
                                        _h)]),
                                    _g.txs = jasmine.arrayContaining([]),
                                    _g)])]);
                        expect(new readonly_date_1.ReadonlyDate(response.header.time).getTime()).toBeLessThan(readonly_date_1.ReadonlyDate.now());
                        expect(new readonly_date_1.ReadonlyDate(response.header.time).getTime()).toBeGreaterThanOrEqual(readonly_date_1.ReadonlyDate.now() - 5000);
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("getBalance", function () {
        it("works for different existing balances", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, response1, response2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.getBalance(testutils_spec_1.unused.address, testutils_spec_1.simapp.denomFee)];
                    case 2:
                        response1 = _a.sent();
                        expect(response1).toEqual({
                            amount: testutils_spec_1.unused.balanceFee,
                            denom: testutils_spec_1.simapp.denomFee
                        });
                        return [4 /*yield*/, client.getBalance(testutils_spec_1.unused.address, testutils_spec_1.simapp.denomStaking)];
                    case 3:
                        response2 = _a.sent();
                        expect(response2).toEqual({
                            amount: testutils_spec_1.unused.balanceStaking,
                            denom: testutils_spec_1.simapp.denomStaking
                        });
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("returns 0 for non-existent balance", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.getBalance(testutils_spec_1.unused.address, "gintonic")];
                    case 2:
                        response = _a.sent();
                        expect(response).toEqual({
                            denom: "gintonic",
                            amount: "0"
                        });
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("returns 0 for non-existent address", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.getBalance(testutils_spec_1.nonExistentAddress, testutils_spec_1.simapp.denomFee)];
                    case 2:
                        response = _a.sent();
                        expect(response).toEqual({
                            denom: testutils_spec_1.simapp.denomFee,
                            amount: "0"
                        });
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("getAllBalances", function () {
        it("returns all balances for unused account", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, balances;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.getAllBalances(testutils_spec_1.unused.address)];
                    case 2:
                        balances = _a.sent();
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
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("returns an empty list for non-existent account", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, balances;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.getAllBalances(testutils_spec_1.nonExistentAddress)];
                    case 2:
                        balances = _a.sent();
                        expect(balances).toEqual([]);
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("broadcastTx", function () {
        it("broadcasts a transaction", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, wallet, _a, address, pubkeyBytes, pubkey, registry, txBodyFields, txBodyBytes, _b, accountNumber, sequence, feeAmount, gasLimit, authInfoBytes, chainId, signDoc, signature, txRaw, txRawBytes, txResult, gasUsed, rawLog, transactionHash;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _c.sent();
                        return [4 /*yield*/, proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                    case 2:
                        wallet = _c.sent();
                        return [4 /*yield*/, wallet.getAccounts()];
                    case 3:
                        _a = (_c.sent())[0], address = _a.address, pubkeyBytes = _a.pubkey;
                        pubkey = (0, proto_signing_1.encodePubkey)({
                            type: "tendermint/PubKeySecp256k1",
                            value: (0, encoding_1.toBase64)(pubkeyBytes)
                        });
                        registry = new proto_signing_1.Registry();
                        txBodyFields = {
                            typeUrl: "/cosmos.tx.v1beta1.TxBody",
                            value: {
                                messages: [
                                    {
                                        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                                        value: {
                                            fromAddress: address,
                                            toAddress: (0, testutils_spec_1.makeRandomAddress)(),
                                            amount: [
                                                {
                                                    denom: "ucosm",
                                                    amount: "1234567"
                                                },
                                            ]
                                        }
                                    },
                                ]
                            }
                        };
                        txBodyBytes = registry.encode(txBodyFields);
                        return [4 /*yield*/, client.getSequence(address)];
                    case 4:
                        _b = (_c.sent()), accountNumber = _b.accountNumber, sequence = _b.sequence;
                        feeAmount = (0, proto_signing_1.coins)(2000, "ucosm");
                        gasLimit = 200000;
                        authInfoBytes = (0, proto_signing_1.makeAuthInfoBytes)([{ pubkey: pubkey, sequence: sequence }], feeAmount, gasLimit);
                        return [4 /*yield*/, client.getChainId()];
                    case 5:
                        chainId = _c.sent();
                        signDoc = (0, proto_signing_1.makeSignDoc)(txBodyBytes, authInfoBytes, chainId, accountNumber);
                        return [4 /*yield*/, wallet.signDirect(address, signDoc)];
                    case 6:
                        signature = (_c.sent()).signature;
                        txRaw = tx_1.TxRaw.fromPartial({
                            bodyBytes: txBodyBytes,
                            authInfoBytes: authInfoBytes,
                            signatures: [(0, encoding_1.fromBase64)(signature.signature)]
                        });
                        txRawBytes = Uint8Array.from(tx_1.TxRaw.encode(txRaw).finish());
                        return [4 /*yield*/, client.broadcastTx(txRawBytes)];
                    case 7:
                        txResult = _c.sent();
                        (0, stargateclient_1.assertIsDeliverTxSuccess)(txResult);
                        gasUsed = txResult.gasUsed, rawLog = txResult.rawLog, transactionHash = txResult.transactionHash;
                        expect(gasUsed).toBeGreaterThan(0);
                        expect(rawLog).toMatch(/{"key":"amount","value":"1234567ucosm"}/);
                        expect(transactionHash).toMatch(/^[0-9A-F]{64}$/);
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("errors immediately for a CheckTx failure", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, wallet, _a, address, pubkeyBytes, pubkey, registry, invalidRecipientAddress, txBodyFields, txBodyBytes, _b, accountNumber, sequence, feeAmount, gasLimit, authInfoBytes, chainId, signDoc, signature, txRaw, txRawBytes;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        client = _c.sent();
                        return [4 /*yield*/, proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                    case 2:
                        wallet = _c.sent();
                        return [4 /*yield*/, wallet.getAccounts()];
                    case 3:
                        _a = (_c.sent())[0], address = _a.address, pubkeyBytes = _a.pubkey;
                        pubkey = (0, proto_signing_1.encodePubkey)({
                            type: "tendermint/PubKeySecp256k1",
                            value: (0, encoding_1.toBase64)(pubkeyBytes)
                        });
                        registry = new proto_signing_1.Registry();
                        invalidRecipientAddress = "tgrade1z363ulwcrxged4z5jswyt5dn5v3lzsemwz9ewj";
                        txBodyFields = {
                            typeUrl: "/cosmos.tx.v1beta1.TxBody",
                            value: {
                                messages: [
                                    {
                                        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                                        value: {
                                            fromAddress: address,
                                            toAddress: invalidRecipientAddress,
                                            amount: [
                                                {
                                                    denom: "ucosm",
                                                    amount: "1234567"
                                                },
                                            ]
                                        }
                                    },
                                ]
                            }
                        };
                        txBodyBytes = registry.encode(txBodyFields);
                        return [4 /*yield*/, client.getSequence(address)];
                    case 4:
                        _b = (_c.sent()), accountNumber = _b.accountNumber, sequence = _b.sequence;
                        feeAmount = (0, proto_signing_1.coins)(2000, "ucosm");
                        gasLimit = 200000;
                        authInfoBytes = (0, proto_signing_1.makeAuthInfoBytes)([{ pubkey: pubkey, sequence: sequence }], feeAmount, gasLimit, sequence);
                        return [4 /*yield*/, client.getChainId()];
                    case 5:
                        chainId = _c.sent();
                        signDoc = (0, proto_signing_1.makeSignDoc)(txBodyBytes, authInfoBytes, chainId, accountNumber);
                        return [4 /*yield*/, wallet.signDirect(address, signDoc)];
                    case 6:
                        signature = (_c.sent()).signature;
                        txRaw = tx_1.TxRaw.fromPartial({
                            bodyBytes: txBodyBytes,
                            authInfoBytes: authInfoBytes,
                            signatures: [(0, encoding_1.fromBase64)(signature.signature)]
                        });
                        txRawBytes = Uint8Array.from(tx_1.TxRaw.encode(txRaw).finish());
                        return [4 /*yield*/, expectAsync(client.broadcastTx(txRawBytes)).toBeRejectedWithError(/invalid recipient address/i)];
                    case 7:
                        _c.sent();
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("respects user timeouts rather than RPC timeouts", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, wallet, _a, address, pubkeyBytes, pubkey, registry, txBodyFields, txBodyBytes, chainId, feeAmount, gasLimit, _b, accountNumber1, sequence1, authInfoBytes1, signDoc1, signature1, txRaw1, txRawBytes1, largeTimeoutMs, txResult, _c, accountNumber2, sequence2, authInfoBytes2, signDoc2, signature2, txRaw2, txRawBytes2, smallTimeoutMs;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSlowSimapp)();
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.slowSimapp.tendermintUrl)];
                    case 1:
                        client = _d.sent();
                        return [4 /*yield*/, proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic)];
                    case 2:
                        wallet = _d.sent();
                        return [4 /*yield*/, wallet.getAccounts()];
                    case 3:
                        _a = (_d.sent())[0], address = _a.address, pubkeyBytes = _a.pubkey;
                        pubkey = (0, proto_signing_1.encodePubkey)({
                            type: "tendermint/PubKeySecp256k1",
                            value: (0, encoding_1.toBase64)(pubkeyBytes)
                        });
                        registry = new proto_signing_1.Registry();
                        txBodyFields = {
                            typeUrl: "/cosmos.tx.v1beta1.TxBody",
                            value: {
                                messages: [
                                    {
                                        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                                        value: {
                                            fromAddress: address,
                                            toAddress: (0, testutils_spec_1.makeRandomAddress)(),
                                            amount: [
                                                {
                                                    denom: "ucosm",
                                                    amount: "1234567"
                                                },
                                            ]
                                        }
                                    },
                                ]
                            }
                        };
                        txBodyBytes = registry.encode(txBodyFields);
                        return [4 /*yield*/, client.getChainId()];
                    case 4:
                        chainId = _d.sent();
                        feeAmount = (0, proto_signing_1.coins)(2000, "ucosm");
                        gasLimit = 200000;
                        return [4 /*yield*/, client.getSequence(address)];
                    case 5:
                        _b = (_d.sent()), accountNumber1 = _b.accountNumber, sequence1 = _b.sequence;
                        authInfoBytes1 = (0, proto_signing_1.makeAuthInfoBytes)([{ pubkey: pubkey, sequence: sequence1 }], feeAmount, gasLimit);
                        signDoc1 = (0, proto_signing_1.makeSignDoc)(txBodyBytes, authInfoBytes1, chainId, accountNumber1);
                        return [4 /*yield*/, wallet.signDirect(address, signDoc1)];
                    case 6:
                        signature1 = (_d.sent()).signature;
                        txRaw1 = tx_1.TxRaw.fromPartial({
                            bodyBytes: txBodyBytes,
                            authInfoBytes: authInfoBytes1,
                            signatures: [(0, encoding_1.fromBase64)(signature1.signature)]
                        });
                        txRawBytes1 = Uint8Array.from(tx_1.TxRaw.encode(txRaw1).finish());
                        largeTimeoutMs = 30000;
                        return [4 /*yield*/, client.broadcastTx(txRawBytes1, largeTimeoutMs)];
                    case 7:
                        txResult = _d.sent();
                        (0, stargateclient_1.assertIsDeliverTxSuccess)(txResult);
                        return [4 /*yield*/, client.getSequence(address)];
                    case 8:
                        _c = (_d.sent()), accountNumber2 = _c.accountNumber, sequence2 = _c.sequence;
                        authInfoBytes2 = (0, proto_signing_1.makeAuthInfoBytes)([{ pubkey: pubkey, sequence: sequence2 }], feeAmount, gasLimit);
                        signDoc2 = (0, proto_signing_1.makeSignDoc)(txBodyBytes, authInfoBytes2, chainId, accountNumber2);
                        return [4 /*yield*/, wallet.signDirect(address, signDoc2)];
                    case 9:
                        signature2 = (_d.sent()).signature;
                        txRaw2 = tx_1.TxRaw.fromPartial({
                            bodyBytes: txBodyBytes,
                            authInfoBytes: authInfoBytes2,
                            signatures: [(0, encoding_1.fromBase64)(signature2.signature)]
                        });
                        txRawBytes2 = Uint8Array.from(tx_1.TxRaw.encode(txRaw2).finish());
                        smallTimeoutMs = 1000;
                        return [4 /*yield*/, expectAsync(client.broadcastTx(txRawBytes2, smallTimeoutMs)).toBeRejectedWithError(stargateclient_1.TimeoutError, /transaction with id .+ was submitted but was not yet found on the chain/i)];
                    case 10:
                        _d.sent();
                        client.disconnect();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
    });
});
