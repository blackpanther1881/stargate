"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.StargateClient = exports.assertIsDeliverTxFailure = exports.assertIsDeliverTxSuccess = exports.isDeliverTxSuccess = exports.isDeliverTxFailure = exports.TimeoutError = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
var encoding_1 = require("@cosmjs/encoding");
var math_1 = require("@cosmjs/math");
var tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
var utils_1 = require("@cosmjs/utils");
var accounts_1 = require("./accounts");
var queries_1 = require("./queries");
var search_1 = require("./search");
var TimeoutError = /** @class */ (function (_super) {
    __extends(TimeoutError, _super);
    function TimeoutError(message, txId) {
        var _this = _super.call(this, message) || this;
        _this.txId = txId;
        return _this;
    }
    return TimeoutError;
}(Error));
exports.TimeoutError = TimeoutError;
function isDeliverTxFailure(result) {
    return !!result.code;
}
exports.isDeliverTxFailure = isDeliverTxFailure;
function isDeliverTxSuccess(result) {
    return !isDeliverTxFailure(result);
}
exports.isDeliverTxSuccess = isDeliverTxSuccess;
/**
 * Ensures the given result is a success. Throws a detailed error message otherwise.
 */
function assertIsDeliverTxSuccess(result) {
    if (isDeliverTxFailure(result)) {
        throw new Error("Error when broadcasting tx " + result.transactionHash + " at height " + result.height + ". Code: " + result.code + "; Raw log: " + result.rawLog);
    }
}
exports.assertIsDeliverTxSuccess = assertIsDeliverTxSuccess;
/**
 * Ensures the given result is a failure. Throws a detailed error message otherwise.
 */
function assertIsDeliverTxFailure(result) {
    if (isDeliverTxSuccess(result)) {
        throw new Error("Transaction " + result.transactionHash + " did not fail at height " + result.height + ". Code: " + result.code + "; Raw log: " + result.rawLog);
    }
}
exports.assertIsDeliverTxFailure = assertIsDeliverTxFailure;
var StargateClient = /** @class */ (function () {
    function StargateClient(tmClient) {
        if (tmClient) {
            this.tmClient = tmClient;
            this.queryClient = queries_1.QueryClient.withExtensions(tmClient, queries_1.setupAuthExtension, queries_1.setupBankExtension, queries_1.setupStakingExtension, queries_1.setupTxExtension);
        }
    }
    StargateClient.connect = function (endpoint) {
        return __awaiter(this, void 0, void 0, function () {
            var tmClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tendermint_rpc_1.Tendermint34Client.connect(endpoint)];
                    case 1:
                        tmClient = _a.sent();
                        return [2 /*return*/, new StargateClient(tmClient)];
                }
            });
        });
    };
    StargateClient.prototype.getTmClient = function () {
        return this.tmClient;
    };
    StargateClient.prototype.forceGetTmClient = function () {
        if (!this.tmClient) {
            throw new Error("Tendermint client not available. You cannot use online functionality in offline mode.");
        }
        return this.tmClient;
    };
    StargateClient.prototype.getQueryClient = function () {
        return this.queryClient;
    };
    StargateClient.prototype.forceGetQueryClient = function () {
        if (!this.queryClient) {
            throw new Error("Query client not available. You cannot use online functionality in offline mode.");
        }
        return this.queryClient;
    };
    StargateClient.prototype.getChainId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, chainId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.chainId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.forceGetTmClient().status()];
                    case 1:
                        response = _a.sent();
                        chainId = response.nodeInfo.network;
                        if (!chainId)
                            throw new Error("Chain ID must not be empty");
                        this.chainId = chainId;
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.chainId];
                }
            });
        });
    };
    StargateClient.prototype.getHeight = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.forceGetTmClient().status()];
                    case 1:
                        status = _a.sent();
                        return [2 /*return*/, status.syncInfo.latestBlockHeight];
                }
            });
        });
    };
    StargateClient.prototype.getAccount = function (searchAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var account, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.forceGetQueryClient().auth.account(searchAddress)];
                    case 1:
                        account = _a.sent();
                        return [2 /*return*/, account ? (0, accounts_1.accountFromAny)(account) : null];
                    case 2:
                        error_1 = _a.sent();
                        if (/rpc error: code = NotFound/i.test(error_1.toString())) {
                            return [2 /*return*/, null];
                        }
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StargateClient.prototype.getSequence = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAccount(address)];
                    case 1:
                        account = _a.sent();
                        if (!account) {
                            throw new Error("Account does not exist on chain. Send some tokens there before trying to query sequence.");
                        }
                        return [2 /*return*/, {
                                accountNumber: account.accountNumber,
                                sequence: account.sequence
                            }];
                }
            });
        });
    };
    StargateClient.prototype.getBlock = function (height) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.forceGetTmClient().block(height)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                id: (0, encoding_1.toHex)(response.blockId.hash).toUpperCase(),
                                header: {
                                    version: {
                                        block: new math_1.Uint53(response.block.header.version.block).toString(),
                                        app: new math_1.Uint53(response.block.header.version.app).toString()
                                    },
                                    height: response.block.header.height,
                                    chainId: response.block.header.chainId,
                                    time: (0, tendermint_rpc_1.toRfc3339WithNanoseconds)(response.block.header.time)
                                },
                                txs: response.block.txs
                            }];
                }
            });
        });
    };
    StargateClient.prototype.getBalance = function (address, searchDenom) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.forceGetQueryClient().bank.balance(address, searchDenom)];
            });
        });
    };
    /**
     * Queries all balances for all denoms that belong to this address.
     *
     * Uses the grpc queries (which iterates over the store internally), and we cannot get
     * proofs from such a method.
     */
    StargateClient.prototype.getAllBalances = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.forceGetQueryClient().bank.allBalances(address)];
            });
        });
    };
    StargateClient.prototype.getDelegation = function (delegatorAddress, validatorAddress) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var delegatedAmount, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.forceGetQueryClient().staking.delegation(delegatorAddress, validatorAddress)];
                    case 1:
                        delegatedAmount = (_a = (_b.sent()).delegationResponse) === null || _a === void 0 ? void 0 : _a.balance;
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        if (e_1.toString().includes("key not found")) {
                            // ignore, `delegatedAmount` remains undefined
                        }
                        else {
                            throw e_1;
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, delegatedAmount || null];
                }
            });
        });
    };
    StargateClient.prototype.getTx = function (id) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.txsQuery("tx.hash='" + id + "'")];
                    case 1:
                        results = _b.sent();
                        return [2 /*return*/, (_a = results[0]) !== null && _a !== void 0 ? _a : null];
                }
            });
        });
    };
    StargateClient.prototype.searchTx = function (query, filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            function withFilters(originalQuery) {
                return originalQuery + " AND tx.height>=" + minHeight + " AND tx.height<=" + maxHeight;
            }
            var minHeight, maxHeight, txs, _a, sentQuery, receivedQuery, _b, sent, received, sentHashes_1, rawQuery, filtered;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        minHeight = filter.minHeight || 0;
                        maxHeight = filter.maxHeight || Number.MAX_SAFE_INTEGER;
                        if (maxHeight < minHeight)
                            return [2 /*return*/, []]; // optional optimization
                        if (!(0, search_1.isSearchByHeightQuery)(query)) return [3 /*break*/, 4];
                        if (!(query.height >= minHeight && query.height <= maxHeight)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.txsQuery("tx.height=" + query.height)];
                    case 1:
                        _a = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = [];
                        _c.label = 3;
                    case 3:
                        txs = _a;
                        return [3 /*break*/, 9];
                    case 4:
                        if (!(0, search_1.isSearchBySentFromOrToQuery)(query)) return [3 /*break*/, 6];
                        sentQuery = withFilters("message.module='bank' AND transfer.sender='" + query.sentFromOrTo + "'");
                        receivedQuery = withFilters("message.module='bank' AND transfer.recipient='" + query.sentFromOrTo + "'");
                        return [4 /*yield*/, Promise.all([sentQuery, receivedQuery].map(function (rawQuery) { return _this.txsQuery(rawQuery); }))];
                    case 5:
                        _b = _c.sent(), sent = _b[0], received = _b[1];
                        sentHashes_1 = sent.map(function (t) { return t.hash; });
                        txs = __spreadArray(__spreadArray([], sent, true), received.filter(function (t) { return !sentHashes_1.includes(t.hash); }), true);
                        return [3 /*break*/, 9];
                    case 6:
                        if (!(0, search_1.isSearchByTagsQuery)(query)) return [3 /*break*/, 8];
                        rawQuery = withFilters(query.tags.map(function (t) { return t.key + "='" + t.value + "'"; }).join(" AND "));
                        return [4 /*yield*/, this.txsQuery(rawQuery)];
                    case 7:
                        txs = _c.sent();
                        return [3 /*break*/, 9];
                    case 8: throw new Error("Unknown query type");
                    case 9:
                        filtered = txs.filter(function (tx) { return tx.height >= minHeight && tx.height <= maxHeight; });
                        return [2 /*return*/, filtered];
                }
            });
        });
    };
    StargateClient.prototype.disconnect = function () {
        if (this.tmClient)
            this.tmClient.disconnect();
    };
    /**
     * Broadcasts a signed transaction to the network and monitors its inclusion in a block.
     *
     * If broadcasting is rejected by the node for some reason (e.g. because of a CheckTx failure),
     * an error is thrown.
     *
     * If the transaction is not included in a block before the provided timeout, this errors with a `TimeoutError`.
     *
     * If the transaction is included in a block, a `DeliverTxResponse` is returned. The caller then
     * usually needs to check for execution success or failure.
     */
    StargateClient.prototype.broadcastTx = function (tx, timeoutMs, pollIntervalMs) {
        if (timeoutMs === void 0) { timeoutMs = 60000; }
        if (pollIntervalMs === void 0) { pollIntervalMs = 3000; }
        return __awaiter(this, void 0, void 0, function () {
            var timedOut, txPollTimeout, pollForTx, broadcasted, transactionId;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timedOut = false;
                        txPollTimeout = setTimeout(function () {
                            timedOut = true;
                        }, timeoutMs);
                        pollForTx = function (txId) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (timedOut) {
                                            throw new TimeoutError("Transaction with ID " + txId + " was submitted but was not yet found on the chain. You might want to check later.", txId);
                                        }
                                        return [4 /*yield*/, (0, utils_1.sleep)(pollIntervalMs)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this.getTx(txId)];
                                    case 2:
                                        result = _a.sent();
                                        return [2 /*return*/, result
                                                ? {
                                                    code: result.code,
                                                    height: result.height,
                                                    rawLog: result.rawLog,
                                                    transactionHash: txId,
                                                    gasUsed: result.gasUsed,
                                                    gasWanted: result.gasWanted
                                                }
                                                : pollForTx(txId)];
                                }
                            });
                        }); };
                        return [4 /*yield*/, this.forceGetTmClient().broadcastTxSync({ tx: tx })];
                    case 1:
                        broadcasted = _a.sent();
                        if (broadcasted.code) {
                            throw new Error("Broadcasting transaction failed with code " + broadcasted.code + " (codespace: " + broadcasted.codeSpace + "). Log: " + broadcasted.log);
                        }
                        transactionId = (0, encoding_1.toHex)(broadcasted.hash).toUpperCase();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                return pollForTx(transactionId).then(function (value) {
                                    clearTimeout(txPollTimeout);
                                    resolve(value);
                                }, function (error) {
                                    clearTimeout(txPollTimeout);
                                    reject(error);
                                });
                            })];
                }
            });
        });
    };
    StargateClient.prototype.txsQuery = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.forceGetTmClient().txSearchAll({ query: query })];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.txs.map(function (tx) {
                                return {
                                    height: tx.height,
                                    hash: (0, encoding_1.toHex)(tx.hash).toUpperCase(),
                                    code: tx.result.code,
                                    rawLog: tx.result.log || "",
                                    tx: tx.tx,
                                    gasUsed: tx.result.gasUsed,
                                    gasWanted: tx.result.gasWanted
                                };
                            })];
                }
            });
        });
    };
    return StargateClient;
}());
exports.StargateClient = StargateClient;
