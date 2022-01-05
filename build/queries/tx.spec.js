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
var proto_signing_1 = require("@cosmjs/proto-signing");
var tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
var utils_1 = require("@cosmjs/utils");
var long_1 = require("long");
var signingstargateclient_1 = require("../signingstargateclient");
var stargateclient_1 = require("../stargateclient");
var testutils_spec_1 = require("../testutils.spec");
var queryclient_1 = require("./queryclient");
var tx_1 = require("./tx");
var utils_2 = require("./utils");
function makeClientWithTx(rpcUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var tmClient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tendermint_rpc_1.Tendermint34Client.connect(rpcUrl)];
                case 1:
                    tmClient = _a.sent();
                    return [2 /*return*/, [queryclient_1.QueryClient.withExtensions(tmClient, tx_1.setupTxExtension), tmClient]];
            }
        });
    });
}
describe("TxExtension", function () {
    var defaultFee = {
        amount: (0, proto_signing_1.coins)(25000, "ucosm"),
        gas: "1500000"
    };
    var txHash;
    var memo;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var wallet, client, recipient, result;
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
                    recipient = (0, testutils_spec_1.makeRandomAddress)();
                    memo = "Test tx " + Date.now();
                    return [4 /*yield*/, client.sendTokens(testutils_spec_1.faucet.address0, recipient, (0, proto_signing_1.coins)(25000, "ucosm"), defaultFee, memo)];
                case 3:
                    result = _a.sent();
                    (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                    txHash = result.transactionHash;
                    return [4 /*yield*/, (0, utils_1.sleep)(75)];
                case 4:
                    _a.sent(); // wait until transactions are indexed
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); });
    describe("getTx", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        (0, utils_1.assertDefined)(txHash);
                        (0, utils_1.assertDefined)(memo);
                        return [4 /*yield*/, makeClientWithTx(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _d.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.tx.getTx(txHash)];
                    case 2:
                        response = _d.sent();
                        expect((_c = (_b = response.tx) === null || _b === void 0 ? void 0 : _b.body) === null || _c === void 0 ? void 0 : _c.memo).toEqual(memo);
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("simulate", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, sequenceClient, registry, msg, msgAny, sequence, response;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        (0, utils_1.assertDefined)(txHash);
                        (0, utils_1.assertDefined)(memo);
                        return [4 /*yield*/, makeClientWithTx(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _e.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl)];
                    case 2:
                        sequenceClient = _e.sent();
                        registry = new proto_signing_1.Registry(signingstargateclient_1.defaultRegistryTypes);
                        msg = {
                            delegatorAddress: testutils_spec_1.faucet.address0,
                            validatorAddress: testutils_spec_1.validator.validatorAddress,
                            amount: (0, proto_signing_1.coin)(25000, "ustake")
                        };
                        msgAny = registry.encodeAsAny({
                            typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                            value: msg
                        });
                        return [4 /*yield*/, sequenceClient.getSequence(testutils_spec_1.faucet.address0)];
                    case 3:
                        sequence = (_e.sent()).sequence;
                        return [4 /*yield*/, client.tx.simulate([msgAny], "foo", testutils_spec_1.faucet.pubkey0, sequence)];
                    case 4:
                        response = _e.sent();
                        expect((_b = response.gasInfo) === null || _b === void 0 ? void 0 : _b.gasUsed.toNumber()).toBeGreaterThanOrEqual(101000);
                        expect((_c = response.gasInfo) === null || _c === void 0 ? void 0 : _c.gasUsed.toNumber()).toBeLessThanOrEqual(150000);
                        expect((_d = response.gasInfo) === null || _d === void 0 ? void 0 : _d.gasWanted).toEqual((0, utils_2.longify)(long_1["default"].UZERO));
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
