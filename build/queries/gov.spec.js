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
var encoding_1 = require("@cosmjs/encoding");
var proto_signing_1 = require("@cosmjs/proto-signing");
var tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
var utils_1 = require("@cosmjs/utils");
var gov_1 = require("cosmjs-types/cosmos/gov/v1beta1/gov");
var any_1 = require("cosmjs-types/google/protobuf/any");
var long_1 = require("long");
var signingstargateclient_1 = require("../signingstargateclient");
var stargateclient_1 = require("../stargateclient");
var testutils_spec_1 = require("../testutils.spec");
var gov_2 = require("./gov");
var queryclient_1 = require("./queryclient");
var utils_2 = require("./utils");
function makeClientWithGov(rpcUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var tmClient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tendermint_rpc_1.Tendermint34Client.connect(rpcUrl)];
                case 1:
                    tmClient = _a.sent();
                    return [2 /*return*/, [queryclient_1.QueryClient.withExtensions(tmClient, gov_2.setupGovExtension), tmClient]];
            }
        });
    });
}
describe("GovExtension", function () {
    var defaultFee = {
        amount: (0, amino_1.coins)(25000, "ucosm"),
        gas: "1500000"
    };
    var textProposal = gov_1.TextProposal.fromPartial({
        title: "Test Proposal",
        description: "This proposal proposes to test whether this proposal passes"
    });
    var initialDeposit = (0, amino_1.coins)(12300000, "ustake");
    var delegationVoter1 = (0, amino_1.coin)(424242, "ustake");
    var delegationVoter2 = (0, amino_1.coin)(777, "ustake");
    var voter1Address = testutils_spec_1.faucet.address1;
    var voter2Address = testutils_spec_1.faucet.address2;
    var proposalId;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var wallet, client, proposalMsg, proposalResult, logs, msgDelegate, result, voteMsg, voteResult, msgDelegate, result, voteMsg, voteResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(0, testutils_spec_1.simappEnabled)()) return [3 /*break*/, 13];
                    return [4 /*yield*/, proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic, {
                            // Use address 1 and 2 instead of 0 to avoid conflicts with other delegation tests
                            // This must match `voterAddress` above.
                            hdPaths: [(0, amino_1.makeCosmoshubPath)(1), (0, amino_1.makeCosmoshubPath)(2)]
                        })];
                case 1:
                    wallet = _a.sent();
                    return [4 /*yield*/, signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions)];
                case 2:
                    client = _a.sent();
                    proposalMsg = {
                        typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
                        value: {
                            content: any_1.Any.fromPartial({
                                typeUrl: "/cosmos.gov.v1beta1.TextProposal",
                                value: Uint8Array.from(gov_1.TextProposal.encode(textProposal).finish())
                            }),
                            proposer: voter1Address,
                            initialDeposit: initialDeposit
                        }
                    };
                    return [4 /*yield*/, client.signAndBroadcast(voter1Address, [proposalMsg], defaultFee, "Test proposal for simd")];
                case 3:
                    proposalResult = _a.sent();
                    (0, stargateclient_1.assertIsDeliverTxSuccess)(proposalResult);
                    logs = JSON.parse(proposalResult.rawLog || "");
                    proposalId = logs[0].events
                        .find(function (_a) {
                        var type = _a.type;
                        return type === "submit_proposal";
                    })
                        .attributes.find(function (_a) {
                        var key = _a.key;
                        return key === "proposal_id";
                    }).value;
                    (0, utils_1.assert)(proposalId, "Proposal ID not found in events");
                    (0, utils_1.assert)(proposalId.match(testutils_spec_1.nonNegativeIntegerMatcher));
                    return [4 /*yield*/, client.getDelegation(voter1Address, testutils_spec_1.validator.validatorAddress)];
                case 4:
                    if (!!(_a.sent())) return [3 /*break*/, 6];
                    msgDelegate = {
                        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                        value: {
                            delegatorAddress: voter1Address,
                            validatorAddress: testutils_spec_1.validator.validatorAddress,
                            amount: delegationVoter1
                        }
                    };
                    return [4 /*yield*/, client.signAndBroadcast(voter1Address, [msgDelegate], defaultFee)];
                case 5:
                    result = _a.sent();
                    (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                    _a.label = 6;
                case 6:
                    voteMsg = {
                        typeUrl: "/cosmos.gov.v1beta1.MsgVote",
                        value: {
                            proposalId: (0, utils_2.longify)(proposalId),
                            voter: voter1Address,
                            option: gov_1.VoteOption.VOTE_OPTION_YES
                        }
                    };
                    return [4 /*yield*/, client.signAndBroadcast(voter1Address, [voteMsg], defaultFee)];
                case 7:
                    voteResult = _a.sent();
                    (0, stargateclient_1.assertIsDeliverTxSuccess)(voteResult);
                    return [4 /*yield*/, client.getDelegation(voter2Address, testutils_spec_1.validator.validatorAddress)];
                case 8:
                    if (!!(_a.sent())) return [3 /*break*/, 10];
                    msgDelegate = {
                        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                        value: {
                            delegatorAddress: voter2Address,
                            validatorAddress: testutils_spec_1.validator.validatorAddress,
                            amount: delegationVoter2
                        }
                    };
                    return [4 /*yield*/, client.signAndBroadcast(voter2Address, [msgDelegate], defaultFee)];
                case 9:
                    result = _a.sent();
                    (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                    _a.label = 10;
                case 10:
                    voteMsg = {
                        typeUrl: "/cosmos.gov.v1beta1.MsgVote",
                        value: {
                            proposalId: (0, utils_2.longify)(proposalId),
                            voter: voter2Address,
                            option: gov_1.VoteOption.VOTE_OPTION_NO_WITH_VETO
                        }
                    };
                    return [4 /*yield*/, client.signAndBroadcast(voter2Address, [voteMsg], defaultFee)];
                case 11:
                    voteResult = _a.sent();
                    (0, stargateclient_1.assertIsDeliverTxSuccess)(voteResult);
                    return [4 /*yield*/, (0, utils_1.sleep)(75)];
                case 12:
                    _a.sent(); // wait until transactions are indexed
                    client.disconnect();
                    _a.label = 13;
                case 13: return [2 /*return*/];
            }
        });
    }); });
    describe("params", function () {
        it("works for deposit", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithGov(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.gov.params("deposit")];
                    case 2:
                        response = _b.sent();
                        expect(response).toEqual(jasmine.objectContaining({
                            depositParams: {
                                minDeposit: testutils_spec_1.simapp.govMinDeposit,
                                maxDepositPeriod: {
                                    seconds: long_1["default"].fromNumber(172800, false),
                                    nanos: 0
                                }
                            }
                        }));
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("works for tallying", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithGov(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.gov.params("tallying")];
                    case 2:
                        response = _b.sent();
                        expect(response).toEqual(jasmine.objectContaining({
                            tallyParams: {
                                // Why the f*** are we getting binary values here?
                                quorum: (0, encoding_1.toAscii)("334000000000000000"),
                                threshold: (0, encoding_1.toAscii)("500000000000000000"),
                                vetoThreshold: (0, encoding_1.toAscii)("334000000000000000")
                            }
                        }));
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        it("works for voting", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        return [4 /*yield*/, makeClientWithGov(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.gov.params("voting")];
                    case 2:
                        response = _b.sent();
                        expect(response).toEqual(jasmine.objectContaining({
                            votingParams: {
                                votingPeriod: {
                                    seconds: long_1["default"].fromNumber(172800, false),
                                    nanos: 0
                                }
                            }
                        }));
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("proposals", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        (0, utils_1.assert)(proposalId, "Missing proposal ID");
                        return [4 /*yield*/, makeClientWithGov(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.gov.proposals(gov_1.ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD, voter1Address, voter1Address)];
                    case 2:
                        response = _b.sent();
                        expect(response.proposals.length).toBeGreaterThanOrEqual(1);
                        expect(response.proposals[response.proposals.length - 1]).toEqual({
                            content: any_1.Any.fromPartial({
                                typeUrl: "/cosmos.gov.v1beta1.TextProposal",
                                value: Uint8Array.from(gov_1.TextProposal.encode(textProposal).finish())
                            }),
                            proposalId: (0, utils_2.longify)(proposalId),
                            status: gov_1.ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
                            finalTallyResult: { yes: "0", abstain: "0", no: "0", noWithVeto: "0" },
                            submitTime: { seconds: jasmine.any(long_1["default"]), nanos: jasmine.any(Number) },
                            depositEndTime: { seconds: jasmine.any(long_1["default"]), nanos: jasmine.any(Number) },
                            totalDeposit: initialDeposit,
                            votingStartTime: { seconds: jasmine.any(long_1["default"]), nanos: jasmine.any(Number) },
                            votingEndTime: { seconds: jasmine.any(long_1["default"]), nanos: jasmine.any(Number) }
                        });
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("proposal", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        (0, utils_1.assert)(proposalId, "Missing proposal ID");
                        return [4 /*yield*/, makeClientWithGov(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.gov.proposal(proposalId)];
                    case 2:
                        response = _b.sent();
                        expect(response.proposal).toEqual({
                            content: any_1.Any.fromPartial({
                                typeUrl: "/cosmos.gov.v1beta1.TextProposal",
                                value: Uint8Array.from(gov_1.TextProposal.encode(textProposal).finish())
                            }),
                            proposalId: (0, utils_2.longify)(proposalId),
                            status: gov_1.ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
                            finalTallyResult: { yes: "0", abstain: "0", no: "0", noWithVeto: "0" },
                            submitTime: { seconds: jasmine.any(long_1["default"]), nanos: jasmine.any(Number) },
                            depositEndTime: { seconds: jasmine.any(long_1["default"]), nanos: jasmine.any(Number) },
                            totalDeposit: initialDeposit,
                            votingStartTime: { seconds: jasmine.any(long_1["default"]), nanos: jasmine.any(Number) },
                            votingEndTime: { seconds: jasmine.any(long_1["default"]), nanos: jasmine.any(Number) }
                        });
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("deposits", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        (0, utils_1.assert)(proposalId, "Missing proposal ID");
                        return [4 /*yield*/, makeClientWithGov(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.gov.deposits(proposalId)];
                    case 2:
                        response = _b.sent();
                        expect(response.deposits).toEqual([
                            {
                                proposalId: (0, utils_2.longify)(proposalId),
                                depositor: voter1Address,
                                amount: initialDeposit
                            },
                        ]);
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("deposit", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        (0, utils_1.assert)(proposalId, "Missing proposal ID");
                        return [4 /*yield*/, makeClientWithGov(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.gov.deposit(proposalId, voter1Address)];
                    case 2:
                        response = _b.sent();
                        expect(response.deposit).toEqual({
                            proposalId: (0, utils_2.longify)(proposalId),
                            depositor: voter1Address,
                            amount: initialDeposit
                        });
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("tally", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        (0, utils_1.assert)(proposalId, "Missing proposal ID");
                        return [4 /*yield*/, makeClientWithGov(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.gov.tally(proposalId)];
                    case 2:
                        response = _b.sent();
                        expect(response.tally).toEqual({
                            yes: delegationVoter1.amount,
                            abstain: "0",
                            no: "0",
                            noWithVeto: delegationVoter2.amount
                        });
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("votes", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        (0, utils_1.assert)(proposalId, "Missing proposal ID");
                        return [4 /*yield*/, makeClientWithGov(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.gov.votes(proposalId)];
                    case 2:
                        response = _b.sent();
                        if ((0, testutils_spec_1.simapp42Enabled)()) {
                            expect(response.votes).toEqual([
                                // why is vote 2 first?
                                gov_1.Vote.fromPartial({
                                    proposalId: (0, utils_2.longify)(proposalId),
                                    voter: voter2Address,
                                    option: gov_1.VoteOption.VOTE_OPTION_NO_WITH_VETO
                                }),
                                gov_1.Vote.fromPartial({
                                    proposalId: (0, utils_2.longify)(proposalId),
                                    voter: voter1Address,
                                    option: gov_1.VoteOption.VOTE_OPTION_YES
                                }),
                            ]);
                        }
                        else {
                            expect(response.votes).toEqual([
                                // why is vote 2 first?
                                gov_1.Vote.fromPartial({
                                    proposalId: (0, utils_2.longify)(proposalId),
                                    voter: voter2Address,
                                    option: gov_1.VoteOption.VOTE_OPTION_NO_WITH_VETO,
                                    options: [
                                        gov_1.WeightedVoteOption.fromPartial({
                                            option: gov_1.VoteOption.VOTE_OPTION_NO_WITH_VETO,
                                            weight: "1000000000000000000"
                                        }),
                                    ]
                                }),
                                gov_1.Vote.fromPartial({
                                    proposalId: (0, utils_2.longify)(proposalId),
                                    voter: voter1Address,
                                    option: gov_1.VoteOption.VOTE_OPTION_YES,
                                    options: [
                                        gov_1.WeightedVoteOption.fromPartial({
                                            option: gov_1.VoteOption.VOTE_OPTION_YES,
                                            weight: "1000000000000000000"
                                        }),
                                    ]
                                }),
                            ]);
                        }
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("vote", function () {
        it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, tmClient, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, testutils_spec_1.pendingWithoutSimapp)();
                        (0, utils_1.assert)(proposalId, "Missing proposal ID");
                        return [4 /*yield*/, makeClientWithGov(testutils_spec_1.simapp.tendermintUrl)];
                    case 1:
                        _a = _b.sent(), client = _a[0], tmClient = _a[1];
                        return [4 /*yield*/, client.gov.vote(proposalId, voter1Address)];
                    case 2:
                        response = _b.sent();
                        if ((0, testutils_spec_1.simapp42Enabled)()) {
                            expect(response.vote).toEqual(gov_1.Vote.fromPartial({
                                voter: voter1Address,
                                proposalId: (0, utils_2.longify)(proposalId),
                                option: gov_1.VoteOption.VOTE_OPTION_YES
                            }));
                        }
                        else {
                            expect(response.vote).toEqual(gov_1.Vote.fromPartial({
                                voter: voter1Address,
                                proposalId: (0, utils_2.longify)(proposalId),
                                option: gov_1.VoteOption.VOTE_OPTION_YES,
                                options: [
                                    gov_1.WeightedVoteOption.fromPartial({
                                        option: gov_1.VoteOption.VOTE_OPTION_YES,
                                        weight: "1000000000000000000"
                                    }),
                                ]
                            }));
                        }
                        tmClient.disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
