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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
/* eslint-disable @typescript-eslint/naming-convention */
var encoding_1 = require("@cosmjs/encoding");
var tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
var bank_1 = require("cosmjs-types/cosmos/bank/v1beta1/bank");
var query_1 = require("cosmjs-types/cosmos/bank/v1beta1/query");
var testutils_spec_1 = require("../testutils.spec");
var queryclient_1 = require("./queryclient");
function makeClient(rpcUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var tmClient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tendermint_rpc_1.Tendermint34Client.connect(rpcUrl)];
                case 1:
                    tmClient = _a.sent();
                    return [2 /*return*/, [queryclient_1.QueryClient.withExtensions(tmClient), tmClient]];
            }
        });
    });
}
/**
 * See
 * - https://github.com/cosmos/cosmos-sdk/blob/v0.42.10/x/bank/types/key.go#L27
 * - https://github.com/cosmos/cosmos-sdk/blob/v0.44.2/x/bank/types/key.go#L28
 */
var denomMetadataPrefix = new Uint8Array([0x01]);
describe("QueryClient", function () {
    describe("queryVerified", function () {
        it("works via WebSockets", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, key, data, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClient(testutils_spec_1.simapp.tendermintUrlWs)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        key = Uint8Array.from(__spreadArray(__spreadArray(__spreadArray([], denomMetadataPrefix, true), (0, encoding_1.toAscii)(testutils_spec_1.simapp.denomFee), true), (0, encoding_1.toAscii)(testutils_spec_1.simapp.denomFee), true));
                        return [4 /*yield*/, client.queryVerified("bank", key)];
                    case 2:
                        data = _b.sent();
                        response = bank_1.Metadata.decode(data);
                        expect(response.base).toEqual(testutils_spec_1.simapp.denomFee);
                        expect(response.description).toEqual("The fee token of this test chain");
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("works via http", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, key, data, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClient(testutils_spec_1.simapp.tendermintUrlHttp)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        key = Uint8Array.from(__spreadArray(__spreadArray(__spreadArray([], denomMetadataPrefix, true), (0, encoding_1.toAscii)(testutils_spec_1.simapp.denomFee), true), (0, encoding_1.toAscii)(testutils_spec_1.simapp.denomFee), true));
                        return [4 /*yield*/, client.queryVerified("bank", key)];
                    case 2:
                        data = _b.sent();
                        response = bank_1.Metadata.decode(data);
                        expect(response.base).toEqual(testutils_spec_1.simapp.denomFee);
                        expect(response.description).toEqual("The fee token of this test chain");
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("queryUnverified", function () {
        it("works via WebSockets", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, requestData, data, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClient(testutils_spec_1.simapp.tendermintUrlWs)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        requestData = Uint8Array.from(query_1.QueryAllBalancesRequest.encode({ address: testutils_spec_1.unused.address }).finish());
                        return [4 /*yield*/, client.queryUnverified("/cosmos.bank.v1beta1.Query/AllBalances", requestData)];
                    case 2:
                        data = _b.sent();
                        response = query_1.QueryAllBalancesResponse.decode(data);
                        expect(response.balances.length).toEqual(2);
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("works via http", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, requestData, data, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClient(testutils_spec_1.simapp.tendermintUrlHttp)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        requestData = Uint8Array.from(query_1.QueryAllBalancesRequest.encode({ address: testutils_spec_1.unused.address }).finish());
                        return [4 /*yield*/, client.queryUnverified("/cosmos.bank.v1beta1.Query/AllBalances", requestData)];
                    case 2:
                        data = _b.sent();
                        response = query_1.QueryAllBalancesResponse.decode(data);
                        expect(response.balances.length).toEqual(2);
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
