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
var auth_1 = require("cosmjs-types/cosmos/auth/v1beta1/auth");
var any_1 = require("cosmjs-types/google/protobuf/any");
var long_1 = require("long");
var testutils_spec_1 = require("../testutils.spec");
var auth_2 = require("./auth");
var queryclient_1 = require("./queryclient");
function makeClientWithAuth(rpcUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var tmClient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tendermint_rpc_1.Tendermint34Client.connect(rpcUrl)];
                case 1:
                    tmClient = _a.sent();
                    return [2 /*return*/, [queryclient_1.QueryClient.withExtensions(tmClient, auth_2.setupAuthExtension), tmClient]];
            }
        });
    });
}
describe("AuthExtension", function () {
    describe("account", function () {
        it("works for unused account", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, account;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithAuth(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.auth.account(testutils_spec_1.unused.address)];
                    case 2:
                        account = _b.sent();
                        (0, utils_1.assert)(account);
                        expect(account.typeUrl).toEqual("/cosmos.auth.v1beta1.BaseAccount");
                        expect(auth_1.BaseAccount.decode(account.value)).toEqual({
                            address: testutils_spec_1.unused.address,
                            // pubKey not set
                            accountNumber: long_1["default"].fromNumber(testutils_spec_1.unused.accountNumber, true),
                            sequence: long_1["default"].fromNumber(0, true)
                        });
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("works for account with pubkey and non-zero sequence", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, account;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithAuth(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.auth.account(testutils_spec_1.validator.delegatorAddress)];
                    case 2:
                        account = _b.sent();
                        (0, utils_1.assert)(account);
                        expect(account.typeUrl).toEqual("/cosmos.auth.v1beta1.BaseAccount");
                        expect(auth_1.BaseAccount.decode(account.value)).toEqual({
                            address: testutils_spec_1.validator.delegatorAddress,
                            pubKey: any_1.Any.fromPartial((0, proto_signing_1.encodePubkey)(testutils_spec_1.validator.pubkey)),
                            accountNumber: long_1["default"].fromNumber(0, true),
                            sequence: long_1["default"].fromNumber(testutils_spec_1.validator.sequence, true)
                        });
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("rejects for non-existent address", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithAuth(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, expectAsync(client.auth.account(testutils_spec_1.nonExistentAddress)).toBeRejectedWithError(/account cosmos1p79apjaufyphcmsn4g07cynqf0wyjuezqu84hd not found/i)];
                    case 2:
                        _b.sent();
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
