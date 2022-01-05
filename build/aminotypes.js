"use strict";
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
exports.AminoTypes = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
var amino_1 = require("@cosmjs/amino");
var encoding_1 = require("@cosmjs/encoding");
var utils_1 = require("@cosmjs/utils");
var gov_1 = require("cosmjs-types/cosmos/gov/v1beta1/gov");
var any_1 = require("cosmjs-types/google/protobuf/any");
var long_1 = require("long");
function omitDefault(input) {
    if (typeof input === "string") {
        return input === "" ? undefined : input;
    }
    if (typeof input === "number") {
        return input === 0 ? undefined : input;
    }
    if (long_1["default"].isLong(input)) {
        return input.isZero() ? undefined : input;
    }
    throw new Error("Got unsupported type '" + typeof input + "'");
}
function createDefaultTypes(prefix) {
    return {
        // bank
        "/cosmos.bank.v1beta1.MsgSend": {
            aminoType: "cosmos-sdk/MsgSend",
            toAmino: function (_a) {
                var fromAddress = _a.fromAddress, toAddress = _a.toAddress, amount = _a.amount;
                return ({
                    from_address: fromAddress,
                    to_address: toAddress,
                    amount: __spreadArray([], amount, true)
                });
            },
            fromAmino: function (_a) {
                var from_address = _a.from_address, to_address = _a.to_address, amount = _a.amount;
                return ({
                    fromAddress: from_address,
                    toAddress: to_address,
                    amount: __spreadArray([], amount, true)
                });
            }
        },
        "/cosmos.bank.v1beta1.MsgMultiSend": {
            aminoType: "cosmos-sdk/MsgMultiSend",
            toAmino: function (_a) {
                var inputs = _a.inputs, outputs = _a.outputs;
                return ({
                    inputs: inputs.map(function (input) { return ({
                        address: input.address,
                        coins: __spreadArray([], input.coins, true)
                    }); }),
                    outputs: outputs.map(function (output) { return ({
                        address: output.address,
                        coins: __spreadArray([], output.coins, true)
                    }); })
                });
            },
            fromAmino: function (_a) {
                var inputs = _a.inputs, outputs = _a.outputs;
                return ({
                    inputs: inputs.map(function (input) { return ({
                        address: input.address,
                        coins: __spreadArray([], input.coins, true)
                    }); }),
                    outputs: outputs.map(function (output) { return ({
                        address: output.address,
                        coins: __spreadArray([], output.coins, true)
                    }); })
                });
            }
        },
        // distribution
        "/cosmos.distribution.v1beta1.MsgFundCommunityPool": {
            aminoType: "cosmos-sdk/MsgFundCommunityPool",
            toAmino: function (_a) {
                var amount = _a.amount, depositor = _a.depositor;
                return ({
                    amount: __spreadArray([], amount, true),
                    depositor: depositor
                });
            },
            fromAmino: function (_a) {
                var amount = _a.amount, depositor = _a.depositor;
                return ({
                    amount: __spreadArray([], amount, true),
                    depositor: depositor
                });
            }
        },
        "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress": {
            aminoType: "cosmos-sdk/MsgModifyWithdrawAddress",
            toAmino: function (_a) {
                var delegatorAddress = _a.delegatorAddress, withdrawAddress = _a.withdrawAddress;
                return ({
                    delegator_address: delegatorAddress,
                    withdraw_address: withdrawAddress
                });
            },
            fromAmino: function (_a) {
                var delegator_address = _a.delegator_address, withdraw_address = _a.withdraw_address;
                return ({
                    delegatorAddress: delegator_address,
                    withdrawAddress: withdraw_address
                });
            }
        },
        "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward": {
            aminoType: "cosmos-sdk/MsgWithdrawDelegationReward",
            toAmino: function (_a) {
                var delegatorAddress = _a.delegatorAddress, validatorAddress = _a.validatorAddress;
                return ({
                    delegator_address: delegatorAddress,
                    validator_address: validatorAddress
                });
            },
            fromAmino: function (_a) {
                var delegator_address = _a.delegator_address, validator_address = _a.validator_address;
                return ({
                    delegatorAddress: delegator_address,
                    validatorAddress: validator_address
                });
            }
        },
        "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission": {
            aminoType: "cosmos-sdk/MsgWithdrawValidatorCommission",
            toAmino: function (_a) {
                var validatorAddress = _a.validatorAddress;
                return ({
                    validator_address: validatorAddress
                });
            },
            fromAmino: function (_a) {
                var validator_address = _a.validator_address;
                return ({
                    validatorAddress: validator_address
                });
            }
        },
        // gov
        "/cosmos.gov.v1beta1.MsgDeposit": {
            aminoType: "cosmos-sdk/MsgDeposit",
            toAmino: function (_a) {
                var amount = _a.amount, depositor = _a.depositor, proposalId = _a.proposalId;
                return {
                    amount: amount,
                    depositor: depositor,
                    proposal_id: proposalId.toString()
                };
            },
            fromAmino: function (_a) {
                var amount = _a.amount, depositor = _a.depositor, proposal_id = _a.proposal_id;
                return {
                    amount: Array.from(amount),
                    depositor: depositor,
                    proposalId: long_1["default"].fromString(proposal_id)
                };
            }
        },
        "/cosmos.gov.v1beta1.MsgVote": {
            aminoType: "cosmos-sdk/MsgVote",
            toAmino: function (_a) {
                var option = _a.option, proposalId = _a.proposalId, voter = _a.voter;
                return {
                    option: option,
                    proposal_id: proposalId.toString(),
                    voter: voter
                };
            },
            fromAmino: function (_a) {
                var option = _a.option, proposal_id = _a.proposal_id, voter = _a.voter;
                return {
                    option: (0, gov_1.voteOptionFromJSON)(option),
                    proposalId: long_1["default"].fromString(proposal_id),
                    voter: voter
                };
            }
        },
        "/cosmos.gov.v1beta1.MsgSubmitProposal": {
            aminoType: "cosmos-sdk/MsgSubmitProposal",
            toAmino: function (_a) {
                var initialDeposit = _a.initialDeposit, proposer = _a.proposer, content = _a.content;
                (0, utils_1.assertDefinedAndNotNull)(content);
                var proposal;
                switch (content.typeUrl) {
                    case "/cosmos.gov.v1beta1.TextProposal": {
                        var textProposal = gov_1.TextProposal.decode(content.value);
                        proposal = {
                            type: "cosmos-sdk/TextProposal",
                            value: {
                                description: textProposal.description,
                                title: textProposal.title
                            }
                        };
                        break;
                    }
                    default:
                        throw new Error("Unsupported proposal type: '" + content.typeUrl + "'");
                }
                return {
                    initial_deposit: initialDeposit,
                    proposer: proposer,
                    content: proposal
                };
            },
            fromAmino: function (_a) {
                var initial_deposit = _a.initial_deposit, proposer = _a.proposer, content = _a.content;
                var any_content;
                switch (content.type) {
                    case "cosmos-sdk/TextProposal": {
                        var value = content.value;
                        (0, utils_1.assert)((0, utils_1.isNonNullObject)(value));
                        var _b = value, title = _b.title, description = _b.description;
                        (0, utils_1.assert)(typeof title === "string");
                        (0, utils_1.assert)(typeof description === "string");
                        any_content = any_1.Any.fromPartial({
                            typeUrl: "/cosmos.gov.v1beta1.TextProposal",
                            value: gov_1.TextProposal.encode(gov_1.TextProposal.fromPartial({
                                title: title,
                                description: description
                            })).finish()
                        });
                        break;
                    }
                    default:
                        throw new Error("Unsupported proposal type: '" + content.type + "'");
                }
                return {
                    initialDeposit: Array.from(initial_deposit),
                    proposer: proposer,
                    content: any_content
                };
            }
        },
        // staking
        "/cosmos.staking.v1beta1.MsgBeginRedelegate": {
            aminoType: "cosmos-sdk/MsgBeginRedelegate",
            toAmino: function (_a) {
                var delegatorAddress = _a.delegatorAddress, validatorSrcAddress = _a.validatorSrcAddress, validatorDstAddress = _a.validatorDstAddress, amount = _a.amount;
                (0, utils_1.assertDefinedAndNotNull)(amount, "missing amount");
                return {
                    delegator_address: delegatorAddress,
                    validator_src_address: validatorSrcAddress,
                    validator_dst_address: validatorDstAddress,
                    amount: amount
                };
            },
            fromAmino: function (_a) {
                var delegator_address = _a.delegator_address, validator_src_address = _a.validator_src_address, validator_dst_address = _a.validator_dst_address, amount = _a.amount;
                return ({
                    delegatorAddress: delegator_address,
                    validatorSrcAddress: validator_src_address,
                    validatorDstAddress: validator_dst_address,
                    amount: amount
                });
            }
        },
        "/cosmos.staking.v1beta1.MsgCreateValidator": {
            aminoType: "cosmos-sdk/MsgCreateValidator",
            toAmino: function (_a) {
                var description = _a.description, commission = _a.commission, minSelfDelegation = _a.minSelfDelegation, delegatorAddress = _a.delegatorAddress, validatorAddress = _a.validatorAddress, pubkey = _a.pubkey, value = _a.value;
                (0, utils_1.assertDefinedAndNotNull)(description, "missing description");
                (0, utils_1.assertDefinedAndNotNull)(commission, "missing commission");
                (0, utils_1.assertDefinedAndNotNull)(pubkey, "missing pubkey");
                (0, utils_1.assertDefinedAndNotNull)(value, "missing value");
                return {
                    description: {
                        moniker: description.moniker,
                        identity: description.identity,
                        website: description.website,
                        security_contact: description.securityContact,
                        details: description.details
                    },
                    commission: {
                        rate: commission.rate,
                        max_rate: commission.maxRate,
                        max_change_rate: commission.maxChangeRate
                    },
                    min_self_delegation: minSelfDelegation,
                    delegator_address: delegatorAddress,
                    validator_address: validatorAddress,
                    pubkey: (0, amino_1.encodeBech32Pubkey)({
                        type: "tendermint/PubKeySecp256k1",
                        value: (0, encoding_1.toBase64)(pubkey.value)
                    }, prefix),
                    value: value
                };
            },
            fromAmino: function (_a) {
                var description = _a.description, commission = _a.commission, min_self_delegation = _a.min_self_delegation, delegator_address = _a.delegator_address, validator_address = _a.validator_address, pubkey = _a.pubkey, value = _a.value;
                var decodedPubkey = (0, amino_1.decodeBech32Pubkey)(pubkey);
                if (decodedPubkey.type !== "tendermint/PubKeySecp256k1") {
                    throw new Error("Only Secp256k1 public keys are supported");
                }
                return {
                    description: {
                        moniker: description.moniker,
                        identity: description.identity,
                        website: description.website,
                        securityContact: description.security_contact,
                        details: description.details
                    },
                    commission: {
                        rate: commission.rate,
                        maxRate: commission.max_rate,
                        maxChangeRate: commission.max_change_rate
                    },
                    minSelfDelegation: min_self_delegation,
                    delegatorAddress: delegator_address,
                    validatorAddress: validator_address,
                    pubkey: {
                        typeUrl: "/cosmos.crypto.secp256k1.PubKey",
                        value: (0, encoding_1.fromBase64)(decodedPubkey.value)
                    },
                    value: value
                };
            }
        },
        "/cosmos.staking.v1beta1.MsgDelegate": {
            aminoType: "cosmos-sdk/MsgDelegate",
            toAmino: function (_a) {
                var delegatorAddress = _a.delegatorAddress, validatorAddress = _a.validatorAddress, amount = _a.amount;
                (0, utils_1.assertDefinedAndNotNull)(amount, "missing amount");
                return {
                    delegator_address: delegatorAddress,
                    validator_address: validatorAddress,
                    amount: amount
                };
            },
            fromAmino: function (_a) {
                var delegator_address = _a.delegator_address, validator_address = _a.validator_address, amount = _a.amount;
                return ({
                    delegatorAddress: delegator_address,
                    validatorAddress: validator_address,
                    amount: amount
                });
            }
        },
        "/cosmos.staking.v1beta1.MsgEditValidator": {
            aminoType: "cosmos-sdk/MsgEditValidator",
            toAmino: function (_a) {
                var description = _a.description, commissionRate = _a.commissionRate, minSelfDelegation = _a.minSelfDelegation, validatorAddress = _a.validatorAddress;
                (0, utils_1.assertDefinedAndNotNull)(description, "missing description");
                return {
                    description: {
                        moniker: description.moniker,
                        identity: description.identity,
                        website: description.website,
                        security_contact: description.securityContact,
                        details: description.details
                    },
                    commission_rate: commissionRate,
                    min_self_delegation: minSelfDelegation,
                    validator_address: validatorAddress
                };
            },
            fromAmino: function (_a) {
                var description = _a.description, commission_rate = _a.commission_rate, min_self_delegation = _a.min_self_delegation, validator_address = _a.validator_address;
                return ({
                    description: {
                        moniker: description.moniker,
                        identity: description.identity,
                        website: description.website,
                        securityContact: description.security_contact,
                        details: description.details
                    },
                    commissionRate: commission_rate,
                    minSelfDelegation: min_self_delegation,
                    validatorAddress: validator_address
                });
            }
        },
        "/cosmos.staking.v1beta1.MsgUndelegate": {
            aminoType: "cosmos-sdk/MsgUndelegate",
            toAmino: function (_a) {
                var delegatorAddress = _a.delegatorAddress, validatorAddress = _a.validatorAddress, amount = _a.amount;
                (0, utils_1.assertDefinedAndNotNull)(amount, "missing amount");
                return {
                    delegator_address: delegatorAddress,
                    validator_address: validatorAddress,
                    amount: amount
                };
            },
            fromAmino: function (_a) {
                var delegator_address = _a.delegator_address, validator_address = _a.validator_address, amount = _a.amount;
                return ({
                    delegatorAddress: delegator_address,
                    validatorAddress: validator_address,
                    amount: amount
                });
            }
        },
        // ibc
        "/ibc.applications.transfer.v1.MsgTransfer": {
            aminoType: "cosmos-sdk/MsgTransfer",
            toAmino: function (_a) {
                var _b, _c, _d;
                var sourcePort = _a.sourcePort, sourceChannel = _a.sourceChannel, token = _a.token, sender = _a.sender, receiver = _a.receiver, timeoutHeight = _a.timeoutHeight, timeoutTimestamp = _a.timeoutTimestamp;
                return ({
                    source_port: sourcePort,
                    source_channel: sourceChannel,
                    token: token,
                    sender: sender,
                    receiver: receiver,
                    timeout_height: timeoutHeight
                        ? {
                            revision_height: (_b = omitDefault(timeoutHeight.revisionHeight)) === null || _b === void 0 ? void 0 : _b.toString(),
                            revision_number: (_c = omitDefault(timeoutHeight.revisionNumber)) === null || _c === void 0 ? void 0 : _c.toString()
                        }
                        : {},
                    timeout_timestamp: (_d = omitDefault(timeoutTimestamp)) === null || _d === void 0 ? void 0 : _d.toString()
                });
            },
            fromAmino: function (_a) {
                var source_port = _a.source_port, source_channel = _a.source_channel, token = _a.token, sender = _a.sender, receiver = _a.receiver, timeout_height = _a.timeout_height, timeout_timestamp = _a.timeout_timestamp;
                return ({
                    sourcePort: source_port,
                    sourceChannel: source_channel,
                    token: token,
                    sender: sender,
                    receiver: receiver,
                    timeoutHeight: timeout_height
                        ? {
                            revisionHeight: long_1["default"].fromString(timeout_height.revision_height || "0", true),
                            revisionNumber: long_1["default"].fromString(timeout_height.revision_number || "0", true)
                        }
                        : undefined,
                    timeoutTimestamp: long_1["default"].fromString(timeout_timestamp || "0", true)
                });
            }
        }
    };
}
/**
 * A map from Stargate message types as used in the messages's `Any` type
 * to Amino types.
 */
var AminoTypes = /** @class */ (function () {
    function AminoTypes(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.additions, additions = _c === void 0 ? {} : _c, _d = _b.prefix, prefix = _d === void 0 ? "cosmos" : _d;
        var additionalAminoTypes = Object.values(additions);
        var filteredDefaultTypes = Object.entries(createDefaultTypes(prefix)).reduce(function (acc, _a) {
            var _b;
            var key = _a[0], value = _a[1];
            return additionalAminoTypes.find(function (_a) {
                var aminoType = _a.aminoType;
                return value.aminoType === aminoType;
            })
                ? acc
                : __assign(__assign({}, acc), (_b = {}, _b[key] = value, _b));
        }, {});
        this.register = __assign(__assign({}, filteredDefaultTypes), additions);
    }
    AminoTypes.prototype.toAmino = function (_a) {
        var typeUrl = _a.typeUrl, value = _a.value;
        var converter = this.register[typeUrl];
        if (!converter) {
            throw new Error("Type URL does not exist in the Amino message type register. " +
                "If you need support for this message type, you can pass in additional entries to the AminoTypes constructor. " +
                "If you think this message type should be included by default, please open an issue at https://github.com/cosmos/cosmjs/issues.");
        }
        return {
            type: converter.aminoType,
            value: converter.toAmino(value)
        };
    };
    AminoTypes.prototype.fromAmino = function (_a) {
        var type = _a.type, value = _a.value;
        var result = Object.entries(this.register).find(function (_a) {
            var _typeUrl = _a[0], aminoType = _a[1].aminoType;
            return aminoType === type;
        });
        if (!result) {
            throw new Error("Type does not exist in the Amino message type register. " +
                "If you need support for this message type, you can pass in additional entries to the AminoTypes constructor. " +
                "If you think this message type should be included by default, please open an issue at https://github.com/cosmos/cosmjs/issues.");
        }
        var typeUrl = result[0], converter = result[1];
        return {
            typeUrl: typeUrl,
            value: converter.fromAmino(value)
        };
    };
    return AminoTypes;
}());
exports.AminoTypes = AminoTypes;
