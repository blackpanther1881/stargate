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
var amino_1 = require("@cosmjs/amino");
var proto_signing_1 = require("@cosmjs/proto-signing");
var utils_1 = require("@cosmjs/utils");
var tx_1 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
var multisignature_1 = require("./multisignature");
var signingstargateclient_1 = require("./signingstargateclient");
var stargateclient_1 = require("./stargateclient");
var testutils_spec_1 = require("./testutils.spec");
describe("multisignature", function () {
    describe("makeCompactBitArray", function () {
        it("works for 0 bits of different lengths", function () {
            expect((0, multisignature_1.makeCompactBitArray)([])).toEqual({ elems: new Uint8Array([]), extraBitsStored: 0 });
            expect((0, multisignature_1.makeCompactBitArray)([false])).toEqual({
                elems: new Uint8Array([0]),
                extraBitsStored: 1
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false])).toEqual({
                elems: new Uint8Array([0]),
                extraBitsStored: 2
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false])).toEqual({
                elems: new Uint8Array([0]),
                extraBitsStored: 3
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false])).toEqual({
                elems: new Uint8Array([0]),
                extraBitsStored: 4
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false])).toEqual({
                elems: new Uint8Array([0]),
                extraBitsStored: 5
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, false])).toEqual({
                elems: new Uint8Array([0]),
                extraBitsStored: 6
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, false, false])).toEqual({
                elems: new Uint8Array([0]),
                extraBitsStored: 7
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, false, false, false])).toEqual({
                elems: new Uint8Array([0]),
                extraBitsStored: 0
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, false, false, false, false])).toEqual({
                elems: new Uint8Array([0, 0]),
                extraBitsStored: 1
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, false, false, false, false, false])).toEqual({ elems: new Uint8Array([0, 0]), extraBitsStored: 2 });
        });
        it("works for 1 bits of different lengths", function () {
            expect((0, multisignature_1.makeCompactBitArray)([])).toEqual({ elems: new Uint8Array([]), extraBitsStored: 0 });
            expect((0, multisignature_1.makeCompactBitArray)([true])).toEqual({
                elems: new Uint8Array([128]),
                extraBitsStored: 1
            });
            expect((0, multisignature_1.makeCompactBitArray)([true, true])).toEqual({
                elems: new Uint8Array([192]),
                extraBitsStored: 2
            });
            expect((0, multisignature_1.makeCompactBitArray)([true, true, true])).toEqual({
                elems: new Uint8Array([224]),
                extraBitsStored: 3
            });
            expect((0, multisignature_1.makeCompactBitArray)([true, true, true, true])).toEqual({
                elems: new Uint8Array([240]),
                extraBitsStored: 4
            });
            expect((0, multisignature_1.makeCompactBitArray)([true, true, true, true, true])).toEqual({
                elems: new Uint8Array([248]),
                extraBitsStored: 5
            });
            expect((0, multisignature_1.makeCompactBitArray)([true, true, true, true, true, true])).toEqual({
                elems: new Uint8Array([252]),
                extraBitsStored: 6
            });
            expect((0, multisignature_1.makeCompactBitArray)([true, true, true, true, true, true, true])).toEqual({
                elems: new Uint8Array([254]),
                extraBitsStored: 7
            });
            expect((0, multisignature_1.makeCompactBitArray)([true, true, true, true, true, true, true, true])).toEqual({
                elems: new Uint8Array([255]),
                extraBitsStored: 0
            });
            expect((0, multisignature_1.makeCompactBitArray)([true, true, true, true, true, true, true, true, true])).toEqual({
                elems: new Uint8Array([255, 128]),
                extraBitsStored: 1
            });
            expect((0, multisignature_1.makeCompactBitArray)([true, true, true, true, true, true, true, true, true, true])).toEqual({
                elems: new Uint8Array([255, 192]),
                extraBitsStored: 2
            });
        });
        it("works for 1 bit in different places", function () {
            expect((0, multisignature_1.makeCompactBitArray)([true, false, false, false, false, false, false, false, false, false])).toEqual({
                elems: new Uint8Array([128, 0]),
                extraBitsStored: 2
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, true, false, false, false, false, false, false, false, false])).toEqual({
                elems: new Uint8Array([64, 0]),
                extraBitsStored: 2
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, true, false, false, false, false, false, false, false])).toEqual({
                elems: new Uint8Array([32, 0]),
                extraBitsStored: 2
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, true, false, false, false, false, false, false])).toEqual({
                elems: new Uint8Array([16, 0]),
                extraBitsStored: 2
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, true, false, false, false, false, false])).toEqual({
                elems: new Uint8Array([8, 0]),
                extraBitsStored: 2
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, true, false, false, false, false])).toEqual({
                elems: new Uint8Array([4, 0]),
                extraBitsStored: 2
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, false, true, false, false, false])).toEqual({
                elems: new Uint8Array([2, 0]),
                extraBitsStored: 2
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, false, false, true, false, false])).toEqual({
                elems: new Uint8Array([1, 0]),
                extraBitsStored: 2
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, false, false, false, true, false])).toEqual({
                elems: new Uint8Array([0, 128]),
                extraBitsStored: 2
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, false, false, false, false, true])).toEqual({
                elems: new Uint8Array([0, 64]),
                extraBitsStored: 2
            });
        });
    });
    describe("makeMultisignedTx", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var multisigAccountAddress, signingInstruction, _a, _b, pubkey0, signature0, bodyBytes, _c, pubkey1, signature1, _d, pubkey2, signature2, _e, pubkey3, signature3, _f, pubkey4, signature4, multisigPubkey, address0, address1, address2, address3, address4, broadcaster, signedTx, result;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        multisigAccountAddress = "cosmos1h90ml36rcu7yegwduzgzderj2jmq49hcpfclw9";
                        return [4 /*yield*/, (function () { return __awaiter(void 0, void 0, void 0, function () {
                                var client, accountOnChain, msgSend, msg, gasLimit, fee;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                                        case 1:
                                            client = _b.sent();
                                            return [4 /*yield*/, client.getAccount(multisigAccountAddress)];
                                        case 2:
                                            accountOnChain = _b.sent();
                                            (0, utils_1.assert)(accountOnChain, "Account does not exist on chain");
                                            msgSend = {
                                                fromAddress: multisigAccountAddress,
                                                toAddress: "cosmos19rvl6ja9h0erq9dc2xxfdzypc739ej8k5esnhg",
                                                amount: (0, proto_signing_1.coins)(1234, "ucosm")
                                            };
                                            msg = {
                                                typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                                                value: msgSend
                                            };
                                            gasLimit = 200000;
                                            fee = {
                                                amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                                                gas: gasLimit.toString()
                                            };
                                            _a = {
                                                accountNumber: accountOnChain.accountNumber,
                                                sequence: accountOnChain.sequence
                                            };
                                            return [4 /*yield*/, client.getChainId()];
                                        case 3: return [2 /*return*/, (_a.chainId = _b.sent(),
                                                _a.msgs = [msg],
                                                _a.fee = fee,
                                                _a.memo = "Use your tokens wisely",
                                                _a)];
                                    }
                                });
                            }); })()];
                    case 1:
                        signingInstruction = _g.sent();
                        return [4 /*yield*/, Promise.all([0, 1, 2, 3, 4].map(function (i) { return __awaiter(void 0, void 0, void 0, function () {
                                var wallet, pubkey, _a, address, signingClient, signerData, _b, bb, signatures;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: return [4 /*yield*/, amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic, {
                                                hdPaths: [(0, amino_1.makeCosmoshubPath)(i)]
                                            })];
                                        case 1:
                                            wallet = _c.sent();
                                            _a = amino_1.encodeSecp256k1Pubkey;
                                            return [4 /*yield*/, wallet.getAccounts()];
                                        case 2:
                                            pubkey = _a.apply(void 0, [(_c.sent())[0].pubkey]);
                                            return [4 /*yield*/, wallet.getAccounts()];
                                        case 3:
                                            address = (_c.sent())[0].address;
                                            return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.offline(wallet)];
                                        case 4:
                                            signingClient = _c.sent();
                                            signerData = {
                                                accountNumber: signingInstruction.accountNumber,
                                                sequence: signingInstruction.sequence,
                                                chainId: signingInstruction.chainId
                                            };
                                            return [4 /*yield*/, signingClient.sign(address, signingInstruction.msgs, signingInstruction.fee, signingInstruction.memo, signerData)];
                                        case 5:
                                            _b = _c.sent(), bb = _b.bodyBytes, signatures = _b.signatures;
                                            return [2 /*return*/, [pubkey, signatures[0], bb]];
                                    }
                                });
                            }); }))];
                    case 2:
                        _a = _g.sent(), _b = _a[0], pubkey0 = _b[0], signature0 = _b[1], bodyBytes = _b[2], _c = _a[1], pubkey1 = _c[0], signature1 = _c[1], _d = _a[2], pubkey2 = _d[0], signature2 = _d[1], _e = _a[3], pubkey3 = _e[0], signature3 = _e[1], _f = _a[4], pubkey4 = _f[0], signature4 = _f[1];
                        multisigPubkey = (0, amino_1.createMultisigThresholdPubkey)([pubkey0, pubkey1, pubkey2, pubkey3, pubkey4], 2);
                        expect((0, amino_1.pubkeyToAddress)(multisigPubkey, "cosmos")).toEqual(multisigAccountAddress);
                        address0 = (0, amino_1.pubkeyToAddress)(pubkey0, "cosmos");
                        address1 = (0, amino_1.pubkeyToAddress)(pubkey1, "cosmos");
                        address2 = (0, amino_1.pubkeyToAddress)(pubkey2, "cosmos");
                        address3 = (0, amino_1.pubkeyToAddress)(pubkey3, "cosmos");
                        address4 = (0, amino_1.pubkeyToAddress)(pubkey4, "cosmos");
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 3:
                        broadcaster = _g.sent();
                        signedTx = (0, multisignature_1.makeMultisignedTx)(multisigPubkey, signingInstruction.sequence, signingInstruction.fee, bodyBytes, new Map([
                            [address0, signature0],
                            [address1, signature1],
                            [address2, signature2],
                            [address3, signature3],
                            [address4, signature4],
                        ]));
                        return [4 /*yield*/, broadcaster.broadcastTx(Uint8Array.from(tx_1.TxRaw.encode(signedTx).finish()))];
                    case 4:
                        result = _g.sent();
                        (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
