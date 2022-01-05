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
exports.ModifyingDirectSecp256k1HdWallet = exports.ModifyingSecp256k1HdWallet = exports.tendermintIdMatcher = exports.nonNegativeIntegerMatcher = exports.nonExistentAddress = exports.validator = exports.unused = exports.faucet = exports.defaultSigningClientOptions = exports.slowSimapp = exports.simapp = exports.defaultSendFee = exports.defaultGasPrice = exports.fromOneElementArray = exports.makeRandomAddress = exports.makeRandomAddressBytes = exports.pendingWithoutSlowSimapp = exports.slowSimappEnabled = exports.pendingWithoutSimapp = exports.pendingWithoutSimapp42 = exports.simappEnabled = exports.simapp44Enabled = exports.simapp42Enabled = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
var amino_1 = require("@cosmjs/amino");
var crypto_1 = require("@cosmjs/crypto");
var encoding_1 = require("@cosmjs/encoding");
var proto_signing_1 = require("@cosmjs/proto-signing");
var signing_1 = require("cosmjs-types/cosmos/tx/signing/v1beta1/signing");
var tx_1 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
var fee_1 = require("./fee");
function simapp42Enabled() {
    return !!process.env.SIMAPP42_ENABLED;
}
exports.simapp42Enabled = simapp42Enabled;
function simapp44Enabled() {
    return !!process.env.SIMAPP44_ENABLED;
}
exports.simapp44Enabled = simapp44Enabled;
function simappEnabled() {
    return simapp42Enabled() || simapp44Enabled();
}
exports.simappEnabled = simappEnabled;
function pendingWithoutSimapp42() {
    if (!simapp42Enabled()) {
        return pending("Set SIMAPP44_ENABLED to enable Simapp based tests");
    }
}
exports.pendingWithoutSimapp42 = pendingWithoutSimapp42;
function pendingWithoutSimapp() {
    if (!simappEnabled()) {
        return pending("Set SIMAPP42_ENABLED or SIMAPP44_ENABLED to enable Simapp based tests");
    }
}
exports.pendingWithoutSimapp = pendingWithoutSimapp;
function slowSimappEnabled() {
    return !!process.env.SLOW_SIMAPP42_ENABLED || !!process.env.SLOW_SIMAPP44_ENABLED;
}
exports.slowSimappEnabled = slowSimappEnabled;
function pendingWithoutSlowSimapp() {
    if (!slowSimappEnabled()) {
        return pending("Set SLOW_SIMAPP42_ENABLED or SLOW_SIMAPP44_ENABLED to enable slow Simapp based tests");
    }
}
exports.pendingWithoutSlowSimapp = pendingWithoutSlowSimapp;
function makeRandomAddressBytes() {
    return crypto_1.Random.getBytes(20);
}
exports.makeRandomAddressBytes = makeRandomAddressBytes;
function makeRandomAddress() {
    return encoding_1.Bech32.encode("cosmos", makeRandomAddressBytes());
}
exports.makeRandomAddress = makeRandomAddress;
/** Returns first element. Throws if array has a different length than 1. */
function fromOneElementArray(elements) {
    if (elements.length !== 1)
        throw new Error("Expected exactly one element but got " + elements.length);
    return elements[0];
}
exports.fromOneElementArray = fromOneElementArray;
exports.defaultGasPrice = fee_1.GasPrice.fromString("0.025ucosm");
exports.defaultSendFee = (0, fee_1.calculateFee)(80000, exports.defaultGasPrice);
exports.simapp = {
    tendermintUrl: "localhost:26658",
    tendermintUrlWs: "ws://localhost:26658",
    tendermintUrlHttp: "http://localhost:26658",
    chainId: "simd-testing",
    denomStaking: "ustake",
    denomFee: "ucosm",
    blockTime: 1000,
    totalSupply: 21000000000,
    govMinDeposit: (0, proto_signing_1.coins)(10000000, "ustake")
};
exports.slowSimapp = {
    tendermintUrl: "localhost:26660",
    tendermintUrlWs: "ws://localhost:26660",
    tendermintUrlHttp: "http://localhost:26660",
    chainId: "simd-testing",
    denomStaking: "ustake",
    denomFee: "ucosm",
    blockTime: 10000,
    totalSupply: 21000000000
};
/** Setting to speed up testing */
exports.defaultSigningClientOptions = {
    broadcastPollIntervalMs: 300,
    broadcastTimeoutMs: 8000
};
exports.faucet = {
    mnemonic: "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
    pubkey0: {
        type: "tendermint/PubKeySecp256k1",
        value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ"
    },
    pubkey1: {
        type: "tendermint/PubKeySecp256k1",
        value: "AiDosfIbBi54XJ1QjCeApumcy/FjdtF+YhywPf3DKTx7"
    },
    pubkey2: {
        type: "tendermint/PubKeySecp256k1",
        value: "AzQg33JZqH7vSsm09esZY5bZvmzYwE/SY78cA0iLxpD7"
    },
    pubkey3: {
        type: "tendermint/PubKeySecp256k1",
        value: "A3gOAlB6aiRTCPvWMQg2+ZbGYNsLd8qlvV28m8p2UhY2"
    },
    pubkey4: {
        type: "tendermint/PubKeySecp256k1",
        value: "Aum2063ub/ErUnIUB36sK55LktGUStgcbSiaAnL1wadu"
    },
    address0: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
    address1: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
    address2: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
    address3: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx",
    address4: "cosmos1hsm76p4ahyhl5yh3ve9ur49r5kemhp2r0dcjvx"
};
/** Unused account */
exports.unused = {
    pubkey: {
        type: "tendermint/PubKeySecp256k1",
        value: "ArkCaFUJ/IH+vKBmNRCdUVl3mCAhbopk9jjW4Ko4OfRQ"
    },
    address: "cosmos1cjsxept9rkggzxztslae9ndgpdyt2408lk850u",
    accountNumber: 16,
    sequence: 0,
    balanceStaking: "2000000000",
    balanceFee: "1000000000"
};
exports.validator = {
    /**
     * From first gentx's auth_info.signer_infos in scripts/simapp42/template/.simapp/config/genesis.json
     *
     * ```
     * jq ".app_state.genutil.gen_txs[0].auth_info.signer_infos[0].public_key" scripts/simapp42/template/.simapp/config/genesis.json
     * ```
     */
    pubkey: {
        type: "tendermint/PubKeySecp256k1",
        value: "AtDcuH4cX1eaxZrJ5shheLG3tXPAoV4awoIZmNQtQxmf"
    },
    /**
     * delegator_address from /cosmos.staking.v1beta1.MsgCreateValidator in scripts/simapp42/template/.simapp/config/genesis.json
     *
     * ```
     * jq ".app_state.genutil.gen_txs[0].body.messages[0].delegator_address" scripts/simapp42/template/.simapp/config/genesis.json
     * ```
     */
    delegatorAddress: "cosmos1urk9gy7cfws0ak9x5nu7lx4un9n6gqkry79679",
    /**
     * validator_address from /cosmos.staking.v1beta1.MsgCreateValidator in scripts/simapp42/template/.simapp/config/genesis.json
     *
     * ```
     * jq ".app_state.genutil.gen_txs[0].body.messages[0].validator_address" scripts/simapp42/template/.simapp/config/genesis.json
     * ```
     */
    validatorAddress: "cosmosvaloper1urk9gy7cfws0ak9x5nu7lx4un9n6gqkrp230jk",
    accountNumber: 0,
    sequence: 1
};
exports.nonExistentAddress = "cosmos1p79apjaufyphcmsn4g07cynqf0wyjuezqu84hd";
exports.nonNegativeIntegerMatcher = /^[0-9]+$/;
exports.tendermintIdMatcher = /^[0-9A-F]{64}$/;
/**
 * A class for testing clients using an Amino signer which modifies the transaction it receives before signing
 */
var ModifyingSecp256k1HdWallet = /** @class */ (function (_super) {
    __extends(ModifyingSecp256k1HdWallet, _super);
    function ModifyingSecp256k1HdWallet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModifyingSecp256k1HdWallet.fromMnemonic = function (mnemonic, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var mnemonicChecked, seed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mnemonicChecked = new crypto_1.EnglishMnemonic(mnemonic);
                        return [4 /*yield*/, crypto_1.Bip39.mnemonicToSeed(mnemonicChecked, options.bip39Password)];
                    case 1:
                        seed = _a.sent();
                        return [2 /*return*/, new ModifyingSecp256k1HdWallet(mnemonicChecked, __assign(__assign({}, options), { seed: seed }))];
                }
            });
        });
    };
    ModifyingSecp256k1HdWallet.prototype.signAmino = function (signerAddress, signDoc) {
        return __awaiter(this, void 0, void 0, function () {
            var modifiedSignDoc;
            return __generator(this, function (_a) {
                modifiedSignDoc = __assign(__assign({}, signDoc), { fee: {
                        amount: (0, proto_signing_1.coins)(3000, "ucosm"),
                        gas: "333333"
                    }, memo: "This was modified" });
                return [2 /*return*/, _super.prototype.signAmino.call(this, signerAddress, modifiedSignDoc)];
            });
        });
    };
    return ModifyingSecp256k1HdWallet;
}(amino_1.Secp256k1HdWallet));
exports.ModifyingSecp256k1HdWallet = ModifyingSecp256k1HdWallet;
/**
 * A class for testing clients using a direct signer which modifies the transaction it receives before signing
 */
var ModifyingDirectSecp256k1HdWallet = /** @class */ (function (_super) {
    __extends(ModifyingDirectSecp256k1HdWallet, _super);
    function ModifyingDirectSecp256k1HdWallet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModifyingDirectSecp256k1HdWallet.fromMnemonic = function (mnemonic, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var mnemonicChecked, seed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mnemonicChecked = new crypto_1.EnglishMnemonic(mnemonic);
                        return [4 /*yield*/, crypto_1.Bip39.mnemonicToSeed(mnemonicChecked, options.bip39Password)];
                    case 1:
                        seed = _a.sent();
                        return [2 /*return*/, new ModifyingDirectSecp256k1HdWallet(mnemonicChecked, __assign(__assign({}, options), { seed: seed }))];
                }
            });
        });
    };
    ModifyingDirectSecp256k1HdWallet.prototype.signDirect = function (address, signDoc) {
        return __awaiter(this, void 0, void 0, function () {
            var txBody, modifiedTxBody, authInfo, signers, modifiedFeeAmount, modifiedGasLimit, modifiedSignDoc;
            return __generator(this, function (_a) {
                txBody = tx_1.TxBody.decode(signDoc.bodyBytes);
                modifiedTxBody = tx_1.TxBody.fromPartial(__assign(__assign({}, txBody), { memo: "This was modified" }));
                authInfo = tx_1.AuthInfo.decode(signDoc.authInfoBytes);
                signers = authInfo.signerInfos.map(function (signerInfo) { return ({
                    pubkey: signerInfo.publicKey,
                    sequence: signerInfo.sequence.toNumber()
                }); });
                modifiedFeeAmount = (0, proto_signing_1.coins)(3000, "ucosm");
                modifiedGasLimit = 333333;
                modifiedSignDoc = __assign(__assign({}, signDoc), { bodyBytes: Uint8Array.from(tx_1.TxBody.encode(modifiedTxBody).finish()), authInfoBytes: (0, proto_signing_1.makeAuthInfoBytes)(signers, modifiedFeeAmount, modifiedGasLimit, signing_1.SignMode.SIGN_MODE_DIRECT) });
                return [2 /*return*/, _super.prototype.signDirect.call(this, address, modifiedSignDoc)];
            });
        });
    };
    return ModifyingDirectSecp256k1HdWallet;
}(proto_signing_1.DirectSecp256k1HdWallet));
exports.ModifyingDirectSecp256k1HdWallet = ModifyingDirectSecp256k1HdWallet;
