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
exports.setupBankExtension = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
var utils_1 = require("@cosmjs/utils");
var query_1 = require("cosmjs-types/cosmos/bank/v1beta1/query");
var utils_2 = require("./utils");
function setupBankExtension(base) {
    var _this = this;
    var rpc = (0, utils_2.createProtobufRpcClient)(base);
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    var queryService = new query_1.QueryClientImpl(rpc);
    return {
        bank: {
            balance: function (address, denom) { return __awaiter(_this, void 0, void 0, function () {
                var balance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, queryService.Balance({ address: address, denom: denom })];
                        case 1:
                            balance = (_a.sent()).balance;
                            (0, utils_1.assert)(balance);
                            return [2 /*return*/, balance];
                    }
                });
            }); },
            allBalances: function (address) { return __awaiter(_this, void 0, void 0, function () {
                var balances;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, queryService.AllBalances({ address: address })];
                        case 1:
                            balances = (_a.sent()).balances;
                            return [2 /*return*/, balances];
                    }
                });
            }); },
            totalSupply: function () { return __awaiter(_this, void 0, void 0, function () {
                var supply;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, queryService.TotalSupply({})];
                        case 1:
                            supply = (_a.sent()).supply;
                            return [2 /*return*/, supply];
                    }
                });
            }); },
            supplyOf: function (denom) { return __awaiter(_this, void 0, void 0, function () {
                var amount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, queryService.SupplyOf({ denom: denom })];
                        case 1:
                            amount = (_a.sent()).amount;
                            (0, utils_1.assert)(amount);
                            return [2 /*return*/, amount];
                    }
                });
            }); },
            denomMetadata: function (denom) { return __awaiter(_this, void 0, void 0, function () {
                var metadata;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, queryService.DenomMetadata({ denom: denom })];
                        case 1:
                            metadata = (_a.sent()).metadata;
                            (0, utils_1.assert)(metadata);
                            return [2 /*return*/, metadata];
                    }
                });
            }); },
            denomsMetadata: function () { return __awaiter(_this, void 0, void 0, function () {
                var metadatas;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, queryService.DenomsMetadata({
                                pagination: undefined
                            })];
                        case 1:
                            metadatas = (_a.sent()).metadatas;
                            return [2 /*return*/, metadatas];
                    }
                });
            }); }
        }
    };
}
exports.setupBankExtension = setupBankExtension;
