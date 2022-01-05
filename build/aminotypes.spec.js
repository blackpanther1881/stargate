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
var amino_1 = require("@cosmjs/amino");
var encoding_1 = require("@cosmjs/encoding");
var proto_signing_1 = require("@cosmjs/proto-signing");
var gov_1 = require("cosmjs-types/cosmos/gov/v1beta1/gov");
var long_1 = require("long");
var aminotypes_1 = require("./aminotypes");
describe("AminoTypes", function () {
    describe("toAmino", function () {
        // bank
        it("works for MsgSend", function () {
            var msg = {
                fromAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                toAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                amount: (0, proto_signing_1.coins)(1234, "ucosm")
            };
            var aminoMsg = new aminotypes_1.AminoTypes().toAmino({
                typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                value: msg
            });
            var expected = {
                type: "cosmos-sdk/MsgSend",
                value: {
                    from_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    to_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    amount: (0, proto_signing_1.coins)(1234, "ucosm")
                }
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgMultiSend", function () {
            var msg = {
                inputs: [
                    { address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6", coins: (0, proto_signing_1.coins)(1234, "ucosm") },
                    { address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5", coins: (0, proto_signing_1.coins)(5678, "ucosm") },
                ],
                outputs: [
                    { address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k", coins: (0, proto_signing_1.coins)(6000, "ucosm") },
                    { address: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx", coins: (0, proto_signing_1.coins)(912, "ucosm") },
                ]
            };
            var aminoMsg = new aminotypes_1.AminoTypes().toAmino({
                typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
                value: msg
            });
            var expected = {
                type: "cosmos-sdk/MsgMultiSend",
                value: {
                    inputs: [
                        { address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6", coins: (0, proto_signing_1.coins)(1234, "ucosm") },
                        { address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5", coins: (0, proto_signing_1.coins)(5678, "ucosm") },
                    ],
                    outputs: [
                        { address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k", coins: (0, proto_signing_1.coins)(6000, "ucosm") },
                        { address: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx", coins: (0, proto_signing_1.coins)(912, "ucosm") },
                    ]
                }
            };
            expect(aminoMsg).toEqual(expected);
        });
        // gov
        it("works for MsgDeposit", function () {
            var msg = {
                amount: [{ amount: "12300000", denom: "ustake" }],
                depositor: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                proposalId: long_1["default"].fromNumber(5)
            };
            var aminoMsg = new aminotypes_1.AminoTypes().toAmino({
                typeUrl: "/cosmos.gov.v1beta1.MsgDeposit",
                value: msg
            });
            var expected = {
                type: "cosmos-sdk/MsgDeposit",
                value: {
                    amount: [{ amount: "12300000", denom: "ustake" }],
                    depositor: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    proposal_id: "5"
                }
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgSubmitProposal", function () {
            var msg = {
                initialDeposit: [{ amount: "12300000", denom: "ustake" }],
                proposer: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                content: {
                    typeUrl: "/cosmos.gov.v1beta1.TextProposal",
                    value: gov_1.TextProposal.encode({
                        description: "This proposal proposes to test whether this proposal passes",
                        title: "Test Proposal"
                    }).finish()
                }
            };
            var aminoMsg = new aminotypes_1.AminoTypes().toAmino({
                typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
                value: msg
            });
            var expected = {
                type: "cosmos-sdk/MsgSubmitProposal",
                value: {
                    initial_deposit: [{ amount: "12300000", denom: "ustake" }],
                    proposer: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    content: {
                        type: "cosmos-sdk/TextProposal",
                        value: {
                            description: "This proposal proposes to test whether this proposal passes",
                            title: "Test Proposal"
                        }
                    }
                }
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgVote", function () {
            var msg = {
                option: gov_1.VoteOption.VOTE_OPTION_NO_WITH_VETO,
                proposalId: long_1["default"].fromNumber(5),
                voter: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k"
            };
            var aminoMsg = new aminotypes_1.AminoTypes().toAmino({
                typeUrl: "/cosmos.gov.v1beta1.MsgVote",
                value: msg
            });
            var expected = {
                type: "cosmos-sdk/MsgVote",
                value: {
                    option: 4,
                    proposal_id: "5",
                    voter: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k"
                }
            };
            expect(aminoMsg).toEqual(expected);
        });
        // distribution
        it("works for MsgFundCommunityPool", function () { return __awaiter(void 0, void 0, void 0, function () {
            var msg, aminoMsg, expected;
            return __generator(this, function (_a) {
                msg = {
                    amount: (0, proto_signing_1.coins)(1234, "ucosm"),
                    depositor: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6"
                };
                aminoMsg = new aminotypes_1.AminoTypes().toAmino({
                    typeUrl: "/cosmos.distribution.v1beta1.MsgFundCommunityPool",
                    value: msg
                });
                expected = {
                    type: "cosmos-sdk/MsgFundCommunityPool",
                    value: {
                        amount: (0, proto_signing_1.coins)(1234, "ucosm"),
                        depositor: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6"
                    }
                };
                expect(aminoMsg).toEqual(expected);
                return [2 /*return*/];
            });
        }); });
        it("works for MsgSetWithdrawAddress", function () { return __awaiter(void 0, void 0, void 0, function () {
            var msg, aminoMsg, expected;
            return __generator(this, function (_a) {
                msg = {
                    delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    withdrawAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5"
                };
                aminoMsg = new aminotypes_1.AminoTypes().toAmino({
                    typeUrl: "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress",
                    value: msg
                });
                expected = {
                    type: "cosmos-sdk/MsgModifyWithdrawAddress",
                    value: {
                        delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                        withdraw_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5"
                    }
                };
                expect(aminoMsg).toEqual(expected);
                return [2 /*return*/];
            });
        }); });
        it("works for MsgWithdrawDelegatorReward", function () { return __awaiter(void 0, void 0, void 0, function () {
            var msg, aminoMsg, expected;
            return __generator(this, function (_a) {
                msg = {
                    delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5"
                };
                aminoMsg = new aminotypes_1.AminoTypes().toAmino({
                    typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
                    value: msg
                });
                expected = {
                    type: "cosmos-sdk/MsgWithdrawDelegationReward",
                    value: {
                        delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                        validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5"
                    }
                };
                expect(aminoMsg).toEqual(expected);
                return [2 /*return*/];
            });
        }); });
        it("works for MsgWithdrawValidatorCommission", function () { return __awaiter(void 0, void 0, void 0, function () {
            var msg, aminoMsg, expected;
            return __generator(this, function (_a) {
                msg = {
                    validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5"
                };
                aminoMsg = new aminotypes_1.AminoTypes().toAmino({
                    typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
                    value: msg
                });
                expected = {
                    type: "cosmos-sdk/MsgWithdrawValidatorCommission",
                    value: {
                        validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5"
                    }
                };
                expect(aminoMsg).toEqual(expected);
                return [2 /*return*/];
            });
        }); });
        // staking
        it("works for MsgBeginRedelegate", function () {
            var msg = {
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                validatorSrcAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                validatorDstAddress: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
                amount: (0, proto_signing_1.coin)(1234, "ucosm")
            };
            var aminoMsg = new aminotypes_1.AminoTypes().toAmino({
                typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
                value: msg
            });
            var expected = {
                type: "cosmos-sdk/MsgBeginRedelegate",
                value: {
                    delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validator_src_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    validator_dst_address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
                    amount: (0, proto_signing_1.coin)(1234, "ucosm")
                }
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgCreateValidator", function () {
            var msg = {
                description: {
                    moniker: "validator",
                    identity: "me",
                    website: "valid.com",
                    securityContact: "Hamburglar",
                    details: "..."
                },
                commission: {
                    rate: "0.2",
                    maxRate: "0.3",
                    maxChangeRate: "0.1"
                },
                minSelfDelegation: "123",
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                pubkey: {
                    typeUrl: "/cosmos.crypto.secp256k1.PubKey",
                    value: (0, encoding_1.fromBase64)("A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ")
                },
                value: (0, proto_signing_1.coin)(1234, "ucosm")
            };
            var aminoMsg = new aminotypes_1.AminoTypes().toAmino({
                typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidator",
                value: msg
            });
            var expected = {
                type: "cosmos-sdk/MsgCreateValidator",
                value: {
                    description: {
                        moniker: "validator",
                        identity: "me",
                        website: "valid.com",
                        security_contact: "Hamburglar",
                        details: "..."
                    },
                    commission: {
                        rate: "0.2",
                        max_rate: "0.3",
                        max_change_rate: "0.1"
                    },
                    min_self_delegation: "123",
                    delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    pubkey: (0, amino_1.encodeBech32Pubkey)({ type: "tendermint/PubKeySecp256k1", value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ" }, "cosmos"),
                    value: (0, proto_signing_1.coin)(1234, "ucosm")
                }
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgDelegate", function () {
            var msg = {
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                amount: (0, proto_signing_1.coin)(1234, "ucosm")
            };
            var aminoMsg = new aminotypes_1.AminoTypes().toAmino({
                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                value: msg
            });
            var expected = {
                type: "cosmos-sdk/MsgDelegate",
                value: {
                    delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    amount: (0, proto_signing_1.coin)(1234, "ucosm")
                }
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgEditValidator", function () {
            var msg = {
                description: {
                    moniker: "validator",
                    identity: "me",
                    website: "valid.com",
                    securityContact: "Hamburglar",
                    details: "..."
                },
                commissionRate: "0.2",
                minSelfDelegation: "123",
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5"
            };
            var aminoMsg = new aminotypes_1.AminoTypes().toAmino({
                typeUrl: "/cosmos.staking.v1beta1.MsgEditValidator",
                value: msg
            });
            var expected = {
                type: "cosmos-sdk/MsgEditValidator",
                value: {
                    description: {
                        moniker: "validator",
                        identity: "me",
                        website: "valid.com",
                        security_contact: "Hamburglar",
                        details: "..."
                    },
                    commission_rate: "0.2",
                    min_self_delegation: "123",
                    validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5"
                }
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgUndelegate", function () {
            var msg = {
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                amount: (0, proto_signing_1.coin)(1234, "ucosm")
            };
            var aminoMsg = new aminotypes_1.AminoTypes().toAmino({
                typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
                value: msg
            });
            var expected = {
                type: "cosmos-sdk/MsgUndelegate",
                value: {
                    delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    amount: (0, proto_signing_1.coin)(1234, "ucosm")
                }
            };
            expect(aminoMsg).toEqual(expected);
        });
        // ibc
        it("works for MsgTransfer", function () {
            var msg = {
                sourcePort: "testport",
                sourceChannel: "testchannel",
                token: (0, proto_signing_1.coin)(1234, "utest"),
                sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                timeoutHeight: {
                    revisionHeight: long_1["default"].fromString("123", true),
                    revisionNumber: long_1["default"].fromString("456", true)
                },
                timeoutTimestamp: long_1["default"].fromString("789", true)
            };
            var aminoMsg = new aminotypes_1.AminoTypes().toAmino({
                typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
                value: msg
            });
            var expected = {
                type: "cosmos-sdk/MsgTransfer",
                value: {
                    source_port: "testport",
                    source_channel: "testchannel",
                    token: (0, proto_signing_1.coin)(1234, "utest"),
                    sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    timeout_height: {
                        revision_height: "123",
                        revision_number: "456"
                    },
                    timeout_timestamp: "789"
                }
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgTransfer with empty values", function () {
            var msg = {
                sourcePort: "testport",
                sourceChannel: "testchannel",
                token: (0, proto_signing_1.coin)(1234, "utest"),
                sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                timeoutHeight: {
                    revisionHeight: long_1["default"].UZERO,
                    revisionNumber: long_1["default"].UZERO
                },
                timeoutTimestamp: long_1["default"].UZERO
            };
            var aminoMsg = new aminotypes_1.AminoTypes().toAmino({
                typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
                value: msg
            });
            var expected = {
                type: "cosmos-sdk/MsgTransfer",
                value: {
                    source_port: "testport",
                    source_channel: "testchannel",
                    token: (0, proto_signing_1.coin)(1234, "utest"),
                    sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    timeout_height: {
                        revision_height: undefined,
                        revision_number: undefined
                    },
                    timeout_timestamp: undefined
                }
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgTransfer with no height timeout", function () {
            var msg = {
                sourcePort: "testport",
                sourceChannel: "testchannel",
                token: (0, proto_signing_1.coin)(1234, "utest"),
                sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                timeoutHeight: undefined,
                timeoutTimestamp: long_1["default"].UZERO
            };
            var aminoMsg = new aminotypes_1.AminoTypes().toAmino({
                typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
                value: msg
            });
            var expected = {
                type: "cosmos-sdk/MsgTransfer",
                value: {
                    source_port: "testport",
                    source_channel: "testchannel",
                    token: (0, proto_signing_1.coin)(1234, "utest"),
                    sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    timeout_height: {},
                    timeout_timestamp: undefined
                }
            };
            expect(aminoMsg).toEqual(expected);
        });
        // other
        it("works with custom type url", function () {
            var msg = {
                foo: "bar"
            };
            var aminoMsg = new aminotypes_1.AminoTypes({
                additions: {
                    "/my.CustomType": {
                        aminoType: "my-sdk/CustomType",
                        toAmino: function (_a) {
                            var foo = _a.foo;
                            return ({
                                foo: "amino-prefix-" + foo,
                                constant: "something-for-amino"
                            });
                        },
                        fromAmino: function () { }
                    }
                }
            }).toAmino({ typeUrl: "/my.CustomType", value: msg });
            expect(aminoMsg).toEqual({
                type: "my-sdk/CustomType",
                value: {
                    foo: "amino-prefix-bar",
                    constant: "something-for-amino"
                }
            });
        });
        it("works with overridden type url", function () {
            var msg = {
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                amount: (0, proto_signing_1.coin)(1234, "ucosm")
            };
            var aminoMsg = new aminotypes_1.AminoTypes({
                additions: {
                    "/cosmos.staking.v1beta1.MsgDelegate": {
                        aminoType: "my-override/MsgDelegate",
                        toAmino: function (m) {
                            var _a;
                            return ({
                                foo: (_a = m.delegatorAddress) !== null && _a !== void 0 ? _a : ""
                            });
                        },
                        fromAmino: function () { }
                    }
                }
            }).toAmino({
                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                value: msg
            });
            var expected = {
                type: "my-override/MsgDelegate",
                value: {
                    foo: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6"
                }
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("throws for unknown type url", function () {
            expect(function () { return new aminotypes_1.AminoTypes().toAmino({ typeUrl: "/xxx.Unknown", value: { foo: "bar" } }); }).toThrowError(/Type URL does not exist in the Amino message type register./i);
        });
    });
    describe("fromAmino", function () {
        // bank
        it("works for MsgSend", function () {
            var aminoMsg = {
                type: "cosmos-sdk/MsgSend",
                value: {
                    from_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    to_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    amount: (0, proto_signing_1.coins)(1234, "ucosm")
                }
            };
            var msg = new aminotypes_1.AminoTypes().fromAmino(aminoMsg);
            var expectedValue = {
                fromAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                toAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                amount: (0, proto_signing_1.coins)(1234, "ucosm")
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                value: expectedValue
            });
        });
        it("works for MsgMultiSend", function () {
            var aminoMsg = {
                type: "cosmos-sdk/MsgMultiSend",
                value: {
                    inputs: [
                        { address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6", coins: (0, proto_signing_1.coins)(1234, "ucosm") },
                        { address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5", coins: (0, proto_signing_1.coins)(5678, "ucosm") },
                    ],
                    outputs: [
                        { address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k", coins: (0, proto_signing_1.coins)(6000, "ucosm") },
                        { address: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx", coins: (0, proto_signing_1.coins)(912, "ucosm") },
                    ]
                }
            };
            var msg = new aminotypes_1.AminoTypes().fromAmino(aminoMsg);
            var expectedValue = {
                inputs: [
                    { address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6", coins: (0, proto_signing_1.coins)(1234, "ucosm") },
                    { address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5", coins: (0, proto_signing_1.coins)(5678, "ucosm") },
                ],
                outputs: [
                    { address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k", coins: (0, proto_signing_1.coins)(6000, "ucosm") },
                    { address: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx", coins: (0, proto_signing_1.coins)(912, "ucosm") },
                ]
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
                value: expectedValue
            });
        });
        // gov
        it("works for MsgDeposit", function () {
            var aminoMsg = {
                type: "cosmos-sdk/MsgDeposit",
                value: {
                    amount: [{ amount: "12300000", denom: "ustake" }],
                    depositor: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    proposal_id: "5"
                }
            };
            var msg = new aminotypes_1.AminoTypes().fromAmino(aminoMsg);
            var expectedValue = {
                amount: [{ amount: "12300000", denom: "ustake" }],
                depositor: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                proposalId: long_1["default"].fromNumber(5)
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.gov.v1beta1.MsgDeposit",
                value: expectedValue
            });
        });
        it("works for MsgSubmitProposal", function () {
            var aminoMsg = {
                type: "cosmos-sdk/MsgSubmitProposal",
                value: {
                    initial_deposit: [{ amount: "12300000", denom: "ustake" }],
                    proposer: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    content: {
                        type: "cosmos-sdk/TextProposal",
                        value: {
                            description: "This proposal proposes to test whether this proposal passes",
                            title: "Test Proposal"
                        }
                    }
                }
            };
            var msg = new aminotypes_1.AminoTypes().fromAmino(aminoMsg);
            var expectedValue = {
                initialDeposit: [{ amount: "12300000", denom: "ustake" }],
                proposer: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                content: {
                    typeUrl: "/cosmos.gov.v1beta1.TextProposal",
                    value: gov_1.TextProposal.encode({
                        description: "This proposal proposes to test whether this proposal passes",
                        title: "Test Proposal"
                    }).finish()
                }
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
                value: expectedValue
            });
        });
        it("works for MsgVote", function () {
            var aminoMsg = {
                type: "cosmos-sdk/MsgVote",
                value: {
                    option: 4,
                    proposal_id: "5",
                    voter: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k"
                }
            };
            var msg = new aminotypes_1.AminoTypes().fromAmino(aminoMsg);
            var expectedValue = {
                option: gov_1.VoteOption.VOTE_OPTION_NO_WITH_VETO,
                proposalId: long_1["default"].fromNumber(5),
                voter: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k"
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.gov.v1beta1.MsgVote",
                value: expectedValue
            });
        });
        // distribution
        // TODO: MsgFundCommunityPool
        // TODO: MsgSetWithdrawAddress
        // TODO: MsgWithdrawDelegatorReward
        // TODO: MsgWithdrawValidatorCommission
        // staking
        it("works for MsgBeginRedelegate", function () {
            var aminoMsg = {
                type: "cosmos-sdk/MsgBeginRedelegate",
                value: {
                    delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validator_src_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    validator_dst_address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
                    amount: (0, proto_signing_1.coin)(1234, "ucosm")
                }
            };
            var msg = new aminotypes_1.AminoTypes().fromAmino(aminoMsg);
            var expectedValue = {
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                validatorSrcAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                validatorDstAddress: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
                amount: (0, proto_signing_1.coin)(1234, "ucosm")
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
                value: expectedValue
            });
        });
        it("works for MsgCreateValidator", function () {
            var aminoMsg = {
                type: "cosmos-sdk/MsgCreateValidator",
                value: {
                    description: {
                        moniker: "validator",
                        identity: "me",
                        website: "valid.com",
                        security_contact: "Hamburglar",
                        details: "..."
                    },
                    commission: {
                        rate: "0.2",
                        max_rate: "0.3",
                        max_change_rate: "0.1"
                    },
                    min_self_delegation: "123",
                    delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    pubkey: (0, amino_1.encodeBech32Pubkey)({ type: "tendermint/PubKeySecp256k1", value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ" }, "cosmos"),
                    value: (0, proto_signing_1.coin)(1234, "ucosm")
                }
            };
            var msg = new aminotypes_1.AminoTypes().fromAmino(aminoMsg);
            var expectedValue = {
                description: {
                    moniker: "validator",
                    identity: "me",
                    website: "valid.com",
                    securityContact: "Hamburglar",
                    details: "..."
                },
                commission: {
                    rate: "0.2",
                    maxRate: "0.3",
                    maxChangeRate: "0.1"
                },
                minSelfDelegation: "123",
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                pubkey: {
                    typeUrl: "/cosmos.crypto.secp256k1.PubKey",
                    value: (0, encoding_1.fromBase64)("A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ")
                },
                value: (0, proto_signing_1.coin)(1234, "ucosm")
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidator",
                value: expectedValue
            });
        });
        it("works for MsgDelegate", function () {
            var aminoMsg = {
                type: "cosmos-sdk/MsgDelegate",
                value: {
                    delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    amount: (0, proto_signing_1.coin)(1234, "ucosm")
                }
            };
            var msg = new aminotypes_1.AminoTypes().fromAmino(aminoMsg);
            var expectedValue = {
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                amount: (0, proto_signing_1.coin)(1234, "ucosm")
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                value: expectedValue
            });
        });
        it("works for MsgEditValidator", function () {
            var aminoMsg = {
                type: "cosmos-sdk/MsgEditValidator",
                value: {
                    description: {
                        moniker: "validator",
                        identity: "me",
                        website: "valid.com",
                        security_contact: "Hamburglar",
                        details: "..."
                    },
                    commission_rate: "0.2",
                    min_self_delegation: "123",
                    validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5"
                }
            };
            var msg = new aminotypes_1.AminoTypes().fromAmino(aminoMsg);
            var expectedValue = {
                description: {
                    moniker: "validator",
                    identity: "me",
                    website: "valid.com",
                    securityContact: "Hamburglar",
                    details: "..."
                },
                commissionRate: "0.2",
                minSelfDelegation: "123",
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5"
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.staking.v1beta1.MsgEditValidator",
                value: expectedValue
            });
        });
        it("works for MsgUndelegate", function () {
            var aminoMsg = {
                type: "cosmos-sdk/MsgUndelegate",
                value: {
                    delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    amount: (0, proto_signing_1.coin)(1234, "ucosm")
                }
            };
            var msg = new aminotypes_1.AminoTypes().fromAmino(aminoMsg);
            var expectedValue = {
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                amount: (0, proto_signing_1.coin)(1234, "ucosm")
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
                value: expectedValue
            });
        });
        // ibc
        it("works for MsgTransfer", function () {
            var aminoMsg = {
                type: "cosmos-sdk/MsgTransfer",
                value: {
                    source_port: "testport",
                    source_channel: "testchannel",
                    token: (0, proto_signing_1.coin)(1234, "utest"),
                    sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    timeout_height: {
                        revision_height: "123",
                        revision_number: "456"
                    },
                    timeout_timestamp: "789"
                }
            };
            var msg = new aminotypes_1.AminoTypes().fromAmino(aminoMsg);
            var expectedValue = {
                sourcePort: "testport",
                sourceChannel: "testchannel",
                token: (0, proto_signing_1.coin)(1234, "utest"),
                sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                timeoutHeight: {
                    revisionHeight: long_1["default"].fromString("123", true),
                    revisionNumber: long_1["default"].fromString("456", true)
                },
                timeoutTimestamp: long_1["default"].fromString("789", true)
            };
            expect(msg).toEqual({
                typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
                value: expectedValue
            });
        });
        it("works for MsgTransfer with default values", function () {
            var aminoMsg = {
                type: "cosmos-sdk/MsgTransfer",
                value: {
                    source_port: "testport",
                    source_channel: "testchannel",
                    token: (0, proto_signing_1.coin)(1234, "utest"),
                    sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    timeout_height: {
                    // revision_height omitted
                    // revision_number omitted
                    }
                }
            };
            var msg = new aminotypes_1.AminoTypes().fromAmino(aminoMsg);
            var expectedValue = {
                sourcePort: "testport",
                sourceChannel: "testchannel",
                token: (0, proto_signing_1.coin)(1234, "utest"),
                sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                timeoutHeight: {
                    revisionHeight: long_1["default"].UZERO,
                    revisionNumber: long_1["default"].UZERO
                },
                timeoutTimestamp: long_1["default"].UZERO
            };
            expect(msg).toEqual({
                typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
                value: expectedValue
            });
        });
        // other
        it("works for custom type url", function () {
            var aminoMsg = {
                type: "my-sdk/CustomType",
                value: {
                    foo: "amino-prefix-bar",
                    constant: "something-for-amino"
                }
            };
            var msg = new aminotypes_1.AminoTypes({
                additions: {
                    "/my.CustomType": {
                        aminoType: "my-sdk/CustomType",
                        toAmino: function () { },
                        fromAmino: function (_a) {
                            var foo = _a.foo;
                            return ({
                                foo: foo.slice(13)
                            });
                        }
                    }
                }
            }).fromAmino(aminoMsg);
            var expectedValue = {
                foo: "bar"
            };
            expect(msg).toEqual({
                typeUrl: "/my.CustomType",
                value: expectedValue
            });
        });
        it("works with overridden type url", function () {
            var msg = new aminotypes_1.AminoTypes({
                additions: {
                    "/my.OverrideType": {
                        aminoType: "cosmos-sdk/MsgDelegate",
                        toAmino: function () { },
                        fromAmino: function (_a) {
                            var foo = _a.foo;
                            return ({
                                delegatorAddress: foo,
                                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                                amount: (0, proto_signing_1.coin)(1234, "ucosm")
                            });
                        }
                    }
                }
            }).fromAmino({
                type: "cosmos-sdk/MsgDelegate",
                value: {
                    foo: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6"
                }
            });
            var expected = {
                typeUrl: "/my.OverrideType",
                value: {
                    delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    amount: (0, proto_signing_1.coin)(1234, "ucosm")
                }
            };
            expect(msg).toEqual(expected);
        });
        it("throws for unknown type url", function () {
            expect(function () {
                return new aminotypes_1.AminoTypes().fromAmino({ type: "cosmos-sdk/MsgUnknown", value: { foo: "bar" } });
            }).toThrowError(/Type does not exist in the Amino message type register./i);
        });
    });
});
