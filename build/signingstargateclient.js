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
exports.SigningStargateClient = exports.defaultRegistryTypes = void 0;
var amino_1 = require("@cosmjs/amino");
var encoding_1 = require("@cosmjs/encoding");
var math_1 = require("@cosmjs/math");
var proto_signing_1 = require("@cosmjs/proto-signing");
var tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
var utils_1 = require("@cosmjs/utils");
var tx_1 = require("cosmjs-types/cosmos/bank/v1beta1/tx");
var tx_2 = require("cosmjs-types/cosmos/distribution/v1beta1/tx");
var tx_3 = require("cosmjs-types/cosmos/gov/v1beta1/tx");
var tx_4 = require("cosmjs-types/cosmos/staking/v1beta1/tx");
var signing_1 = require("cosmjs-types/cosmos/tx/signing/v1beta1/signing");
var tx_5 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
var tx_6 = require("cosmjs-types/ibc/applications/transfer/v1/tx");
var tx_7 = require("cosmjs-types/ibc/core/channel/v1/tx");
var tx_8 = require("cosmjs-types/ibc/core/client/v1/tx");
var tx_9 = require("cosmjs-types/ibc/core/connection/v1/tx");
var long_1 = require("long");
var aminotypes_1 = require("./aminotypes");
var fee_1 = require("./fee");
var stargateclient_1 = require("./stargateclient");
exports.defaultRegistryTypes = [
    ["/cosmos.bank.v1beta1.MsgMultiSend", tx_1.MsgMultiSend],
    ["/cosmos.distribution.v1beta1.MsgFundCommunityPool", tx_2.MsgFundCommunityPool],
    ["/cosmos.distribution.v1beta1.MsgSetWithdrawAddress", tx_2.MsgSetWithdrawAddress],
    ["/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward", tx_2.MsgWithdrawDelegatorReward],
    ["/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission", tx_2.MsgWithdrawValidatorCommission],
    ["/cosmos.gov.v1beta1.MsgDeposit", tx_3.MsgDeposit],
    ["/cosmos.gov.v1beta1.MsgSubmitProposal", tx_3.MsgSubmitProposal],
    ["/cosmos.gov.v1beta1.MsgVote", tx_3.MsgVote],
    ["/cosmos.staking.v1beta1.MsgBeginRedelegate", tx_4.MsgBeginRedelegate],
    ["/cosmos.staking.v1beta1.MsgCreateValidator", tx_4.MsgCreateValidator],
    ["/cosmos.staking.v1beta1.MsgDelegate", tx_4.MsgDelegate],
    ["/cosmos.staking.v1beta1.MsgEditValidator", tx_4.MsgEditValidator],
    ["/cosmos.staking.v1beta1.MsgUndelegate", tx_4.MsgUndelegate],
    ["/ibc.core.channel.v1.MsgChannelOpenInit", tx_7.MsgChannelOpenInit],
    ["/ibc.core.channel.v1.MsgChannelOpenTry", tx_7.MsgChannelOpenTry],
    ["/ibc.core.channel.v1.MsgChannelOpenAck", tx_7.MsgChannelOpenAck],
    ["/ibc.core.channel.v1.MsgChannelOpenConfirm", tx_7.MsgChannelOpenConfirm],
    ["/ibc.core.channel.v1.MsgChannelCloseInit", tx_7.MsgChannelCloseInit],
    ["/ibc.core.channel.v1.MsgChannelCloseConfirm", tx_7.MsgChannelCloseConfirm],
    ["/ibc.core.channel.v1.MsgRecvPacket", tx_7.MsgRecvPacket],
    ["/ibc.core.channel.v1.MsgTimeout", tx_7.MsgTimeout],
    ["/ibc.core.channel.v1.MsgTimeoutOnClose", tx_7.MsgTimeoutOnClose],
    ["/ibc.core.channel.v1.MsgAcknowledgement", tx_7.MsgAcknowledgement],
    ["/ibc.core.client.v1.MsgCreateClient", tx_8.MsgCreateClient],
    ["/ibc.core.client.v1.MsgUpdateClient", tx_8.MsgUpdateClient],
    ["/ibc.core.client.v1.MsgUpgradeClient", tx_8.MsgUpgradeClient],
    ["/ibc.core.client.v1.MsgSubmitMisbehaviour", tx_8.MsgSubmitMisbehaviour],
    ["/ibc.core.connection.v1.MsgConnectionOpenInit", tx_9.MsgConnectionOpenInit],
    ["/ibc.core.connection.v1.MsgConnectionOpenTry", tx_9.MsgConnectionOpenTry],
    ["/ibc.core.connection.v1.MsgConnectionOpenAck", tx_9.MsgConnectionOpenAck],
    ["/ibc.core.connection.v1.MsgConnectionOpenConfirm", tx_9.MsgConnectionOpenConfirm],
    ["/ibc.applications.transfer.v1.MsgTransfer", tx_6.MsgTransfer],
];
function createDefaultRegistry() {
    return new proto_signing_1.Registry(exports.defaultRegistryTypes);
}
var SigningStargateClient = /** @class */ (function (_super) {
    __extends(SigningStargateClient, _super);
    function SigningStargateClient(tmClient, signer, options) {
        var _this = _super.call(this, tmClient) || this;
        var _a = options.registry, registry = _a === void 0 ? createDefaultRegistry() : _a, _b = options.aminoTypes, aminoTypes = _b === void 0 ? new aminotypes_1.AminoTypes({ prefix: options.prefix }) : _b;
        _this.registry = registry;
        _this.aminoTypes = aminoTypes;
        _this.signer = signer;
        _this.broadcastTimeoutMs = options.broadcastTimeoutMs;
        _this.broadcastPollIntervalMs = options.broadcastPollIntervalMs;
        _this.gasPrice = options.gasPrice;
        return _this;
    }
    SigningStargateClient.connectWithSigner = function (endpoint, signer, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tmClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tendermint_rpc_1.Tendermint34Client.connect(endpoint)];
                    case 1:
                        tmClient = _a.sent();
                        return [2 /*return*/, new SigningStargateClient(tmClient, signer, options)];
                }
            });
        });
    };
    /**
     * Creates a client in offline mode.
     *
     * This should only be used in niche cases where you know exactly what you're doing,
     * e.g. when building an offline signing application.
     *
     * When you try to use online functionality with such a signer, an
     * exception will be raised.
     */
    SigningStargateClient.offline = function (signer, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new SigningStargateClient(undefined, signer, options)];
            });
        });
    };
    SigningStargateClient.prototype.simulate = function (signerAddress, messages, memo) {
        return __awaiter(this, void 0, void 0, function () {
            var anyMsgs, accountFromSigner, pubkey, sequence, gasInfo;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        anyMsgs = messages.map(function (m) { return _this.registry.encodeAsAny(m); });
                        return [4 /*yield*/, this.signer.getAccounts()];
                    case 1:
                        accountFromSigner = (_a.sent()).find(function (account) { return account.address === signerAddress; });
                        if (!accountFromSigner) {
                            throw new Error("Failed to retrieve account from signer");
                        }
                        pubkey = (0, amino_1.encodeSecp256k1Pubkey)(accountFromSigner.pubkey);
                        return [4 /*yield*/, this.getSequence(signerAddress)];
                    case 2:
                        sequence = (_a.sent()).sequence;
                        return [4 /*yield*/, this.forceGetQueryClient().tx.simulate(anyMsgs, memo, pubkey, sequence)];
                    case 3:
                        gasInfo = (_a.sent()).gasInfo;
                        (0, utils_1.assertDefined)(gasInfo);
                        return [2 /*return*/, math_1.Uint53.fromString(gasInfo.gasUsed.toString()).toNumber()];
                }
            });
        });
    };
    SigningStargateClient.prototype.sendTokens = function (senderAddress, recipientAddress, amount, fee, memo) {
        if (memo === void 0) { memo = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var sendMsg;
            return __generator(this, function (_a) {
                sendMsg = {
                    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                    value: {
                        fromAddress: senderAddress,
                        toAddress: recipientAddress,
                        amount: __spreadArray([], amount, true)
                    }
                };
                return [2 /*return*/, this.signAndBroadcast(senderAddress, [sendMsg], fee, memo)];
            });
        });
    };
    SigningStargateClient.prototype.delegateTokens = function (delegatorAddress, validatorAddress, amount, fee, memo) {
        if (memo === void 0) { memo = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var delegateMsg;
            return __generator(this, function (_a) {
                delegateMsg = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: tx_4.MsgDelegate.fromPartial({
                        delegatorAddress: delegatorAddress,
                        validatorAddress: validatorAddress,
                        amount: amount
                    })
                };
                return [2 /*return*/, this.signAndBroadcast(delegatorAddress, [delegateMsg], fee, memo)];
            });
        });
    };
    SigningStargateClient.prototype.undelegateTokens = function (delegatorAddress, validatorAddress, amount, fee, memo) {
        if (memo === void 0) { memo = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var undelegateMsg;
            return __generator(this, function (_a) {
                undelegateMsg = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
                    value: tx_4.MsgUndelegate.fromPartial({
                        delegatorAddress: delegatorAddress,
                        validatorAddress: validatorAddress,
                        amount: amount
                    })
                };
                return [2 /*return*/, this.signAndBroadcast(delegatorAddress, [undelegateMsg], fee, memo)];
            });
        });
    };
    SigningStargateClient.prototype.withdrawRewards = function (delegatorAddress, validatorAddress, fee, memo) {
        if (memo === void 0) { memo = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var withdrawMsg;
            return __generator(this, function (_a) {
                withdrawMsg = {
                    typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
                    value: tx_2.MsgWithdrawDelegatorReward.fromPartial({
                        delegatorAddress: delegatorAddress,
                        validatorAddress: validatorAddress
                    })
                };
                return [2 /*return*/, this.signAndBroadcast(delegatorAddress, [withdrawMsg], fee, memo)];
            });
        });
    };
    SigningStargateClient.prototype.sendIbcTokens = function (senderAddress, recipientAddress, transferAmount, sourcePort, sourceChannel, timeoutHeight, 
    /** timeout in seconds */
    timeoutTimestamp, fee, memo) {
        if (memo === void 0) { memo = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var timeoutTimestampNanoseconds, transferMsg;
            return __generator(this, function (_a) {
                timeoutTimestampNanoseconds = timeoutTimestamp
                    ? long_1["default"].fromNumber(timeoutTimestamp).multiply(1000000000)
                    : undefined;
                transferMsg = {
                    typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
                    value: tx_6.MsgTransfer.fromPartial({
                        sourcePort: sourcePort,
                        sourceChannel: sourceChannel,
                        sender: senderAddress,
                        receiver: recipientAddress,
                        token: transferAmount,
                        timeoutHeight: timeoutHeight,
                        timeoutTimestamp: timeoutTimestampNanoseconds
                    })
                };
                return [2 /*return*/, this.signAndBroadcast(senderAddress, [transferMsg], fee, memo)];
            });
        });
    };
    SigningStargateClient.prototype.signAndBroadcast = function (signerAddress, messages, fee, memo) {
        if (memo === void 0) { memo = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var usedFee, gasEstimation, muliplier, txRaw, txBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(fee == "auto" || typeof fee === "number")) return [3 /*break*/, 2];
                        (0, utils_1.assertDefined)(this.gasPrice, "Gas price must be set in the client options when auto gas is used.");
                        return [4 /*yield*/, this.simulate(signerAddress, messages, memo)];
                    case 1:
                        gasEstimation = _a.sent();
                        muliplier = typeof fee === "number" ? fee : 1.3;
                        usedFee = (0, fee_1.calculateFee)(Math.round(gasEstimation * muliplier), this.gasPrice);
                        return [3 /*break*/, 3];
                    case 2:
                        usedFee = fee;
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.sign(signerAddress, messages, usedFee, memo)];
                    case 4:
                        txRaw = _a.sent();
                        txBytes = tx_5.TxRaw.encode(txRaw).finish();
                        return [2 /*return*/, this.broadcastTx(txBytes, this.broadcastTimeoutMs, this.broadcastPollIntervalMs)];
                }
            });
        });
    };
    /**
     * Gets account number and sequence from the API, creates a sign doc,
     * creates a single signature and assembles the signed transaction.
     *
     * The sign mode (SIGN_MODE_DIRECT or SIGN_MODE_LEGACY_AMINO_JSON) is determined by this client's signer.
     *
     * You can pass signer data (account number, sequence and chain ID) explicitly instead of querying them
     * from the chain. This is needed when signing for a multisig account, but it also allows for offline signing
     * (See the SigningStargateClient.offline constructor).
     */
    SigningStargateClient.prototype.sign = function (signerAddress, messages, fee, memo, explicitSignerData) {
        return __awaiter(this, void 0, void 0, function () {
            var signerData, _a, accountNumber, sequence, chainId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!explicitSignerData) return [3 /*break*/, 1];
                        signerData = explicitSignerData;
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.getSequence(signerAddress)];
                    case 2:
                        _a = _b.sent(), accountNumber = _a.accountNumber, sequence = _a.sequence;
                        return [4 /*yield*/, this.getChainId()];
                    case 3:
                        chainId = _b.sent();
                        signerData = {
                            accountNumber: accountNumber,
                            sequence: sequence,
                            chainId: chainId
                        };
                        _b.label = 4;
                    case 4: return [2 /*return*/, (0, proto_signing_1.isOfflineDirectSigner)(this.signer)
                            ? this.signDirect(signerAddress, messages, fee, memo, signerData)
                            : this.signAmino(signerAddress, messages, fee, memo, signerData)];
                }
            });
        });
    };
    SigningStargateClient.prototype.signAmino = function (signerAddress, messages, fee, memo, _a) {
        var accountNumber = _a.accountNumber, sequence = _a.sequence, chainId = _a.chainId;
        return __awaiter(this, void 0, void 0, function () {
            var accountFromSigner, pubkey, signMode, msgs, signDoc, _b, signature, signed, signedTxBody, signedTxBodyEncodeObject, signedTxBodyBytes, signedGasLimit, signedSequence, signedAuthInfoBytes;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        (0, utils_1.assert)(!(0, proto_signing_1.isOfflineDirectSigner)(this.signer));
                        return [4 /*yield*/, this.signer.getAccounts()];
                    case 1:
                        accountFromSigner = (_c.sent()).find(function (account) { return account.address === signerAddress; });
                        if (!accountFromSigner) {
                            throw new Error("Failed to retrieve account from signer");
                        }
                        pubkey = (0, proto_signing_1.encodePubkey)((0, amino_1.encodeSecp256k1Pubkey)(accountFromSigner.pubkey));
                        signMode = signing_1.SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
                        msgs = messages.map(function (msg) { return _this.aminoTypes.toAmino(msg); });
                        signDoc = (0, amino_1.makeSignDoc)(msgs, fee, chainId, memo, accountNumber, sequence);
                        return [4 /*yield*/, this.signer.signAmino(signerAddress, signDoc)];
                    case 2:
                        _b = _c.sent(), signature = _b.signature, signed = _b.signed;
                        signedTxBody = {
                            messages: signed.msgs.map(function (msg) { return _this.aminoTypes.fromAmino(msg); }),
                            memo: signed.memo
                        };
                        signedTxBodyEncodeObject = {
                            typeUrl: "/cosmos.tx.v1beta1.TxBody",
                            value: signedTxBody
                        };
                        signedTxBodyBytes = this.registry.encode(signedTxBodyEncodeObject);
                        signedGasLimit = math_1.Int53.fromString(signed.fee.gas).toNumber();
                        signedSequence = math_1.Int53.fromString(signed.sequence).toNumber();
                        signedAuthInfoBytes = (0, proto_signing_1.makeAuthInfoBytes)([{ pubkey: pubkey, sequence: signedSequence }], signed.fee.amount, signedGasLimit, signMode);
                        return [2 /*return*/, tx_5.TxRaw.fromPartial({
                                bodyBytes: signedTxBodyBytes,
                                authInfoBytes: signedAuthInfoBytes,
                                signatures: [(0, encoding_1.fromBase64)(signature.signature)]
                            })];
                }
            });
        });
    };
    SigningStargateClient.prototype.signDirect = function (signerAddress, messages, fee, memo, _a) {
        var accountNumber = _a.accountNumber, sequence = _a.sequence, chainId = _a.chainId;
        return __awaiter(this, void 0, void 0, function () {
            var accountFromSigner, pubkey, txBodyEncodeObject, txBodyBytes, gasLimit, authInfoBytes, signDoc, _b, signature, signed;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        (0, utils_1.assert)((0, proto_signing_1.isOfflineDirectSigner)(this.signer));
                        return [4 /*yield*/, this.signer.getAccounts()];
                    case 1:
                        accountFromSigner = (_c.sent()).find(function (account) { return account.address === signerAddress; });
                        if (!accountFromSigner) {
                            throw new Error("Failed to retrieve account from signer");
                        }
                        pubkey = (0, proto_signing_1.encodePubkey)((0, amino_1.encodeSecp256k1Pubkey)(accountFromSigner.pubkey));
                        txBodyEncodeObject = {
                            typeUrl: "/cosmos.tx.v1beta1.TxBody",
                            value: {
                                messages: messages,
                                memo: memo
                            }
                        };
                        txBodyBytes = this.registry.encode(txBodyEncodeObject);
                        gasLimit = math_1.Int53.fromString(fee.gas).toNumber();
                        authInfoBytes = (0, proto_signing_1.makeAuthInfoBytes)([{ pubkey: pubkey, sequence: sequence }], fee.amount, gasLimit);
                        signDoc = (0, proto_signing_1.makeSignDoc)(txBodyBytes, authInfoBytes, chainId, accountNumber);
                        return [4 /*yield*/, this.signer.signDirect(signerAddress, signDoc)];
                    case 2:
                        _b = _c.sent(), signature = _b.signature, signed = _b.signed;
                        return [2 /*return*/, tx_5.TxRaw.fromPartial({
                                bodyBytes: signed.bodyBytes,
                                authInfoBytes: signed.authInfoBytes,
                                signatures: [(0, encoding_1.fromBase64)(signature.signature)]
                            })];
                }
            });
        });
    };
    return SigningStargateClient;
}(stargateclient_1.StargateClient));
exports.SigningStargateClient = SigningStargateClient;
