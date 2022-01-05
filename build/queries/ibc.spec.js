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
var tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
var long_1 = require("long");
var testutils_spec_1 = require("../testutils.spec");
var ibc_1 = require("./ibc");
var ibcTest = require("./ibctestdata.spec");
var queryclient_1 = require("./queryclient");
function makeClientWithIbc(rpcUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var tmClient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tendermint_rpc_1.Tendermint34Client.connect(rpcUrl)];
                case 1:
                    tmClient = _a.sent();
                    return [2 /*return*/, [queryclient_1.QueryClient.withExtensions(tmClient, ibc_1.setupIbcExtension), tmClient]];
            }
        });
    });
}
describe("IbcExtension", function () {
    describe("channel", function () {
        describe("channel", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.channel.channel(ibcTest.portId, ibcTest.channelId)];
                        case 2:
                            response = _b.sent();
                            expect(response.channel).toEqual(ibcTest.channel);
                            expect(response.proofHeight).toBeDefined();
                            expect(response.proofHeight).not.toBeNull();
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("channels", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.channel.channels()];
                        case 2:
                            response = _b.sent();
                            expect(response.channels).toEqual([ibcTest.identifiedChannel]);
                            expect(response.pagination).toBeDefined();
                            expect(response.height).toBeDefined();
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("allChannels", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.channel.allChannels()];
                        case 2:
                            response = _b.sent();
                            expect(response.channels).toEqual([ibcTest.identifiedChannel]);
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("connectionChannels", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.channel.connectionChannels(ibcTest.connectionId)];
                        case 2:
                            response = _b.sent();
                            expect(response.channels).toEqual([ibcTest.identifiedChannel]);
                            expect(response.pagination).toBeDefined();
                            expect(response.height).toBeDefined();
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("allConnectionChannels", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.channel.allConnectionChannels(ibcTest.connectionId)];
                        case 2:
                            response = _b.sent();
                            expect(response.channels).toEqual([ibcTest.identifiedChannel]);
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("clientState", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.channel.clientState(ibcTest.portId, ibcTest.channelId)];
                        case 2:
                            response = _b.sent();
                            expect(response.identifiedClientState).toEqual({
                                clientId: ibcTest.clientId,
                                clientState: {
                                    typeUrl: "/ibc.lightclients.tendermint.v1.ClientState",
                                    value: jasmine.any(Uint8Array)
                                }
                            });
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("consensusState", function () {
            xit("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.channel.consensusState(ibcTest.portId, ibcTest.channelId, 
                                // TODO: Find valid values
                                0, 0)];
                        case 2:
                            response = _b.sent();
                            expect(response.consensusState).toEqual({
                                typeUrl: "/haha",
                                value: jasmine.any(Uint8Array)
                            });
                            expect(response.clientId).toEqual(ibcTest.clientId);
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("packetCommitment", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.channel.packetCommitment(ibcTest.portId, ibcTest.channelId, long_1["default"].fromInt(ibcTest.commitment.sequence, true))];
                        case 2:
                            response = _b.sent();
                            expect(response.commitment).toEqual(ibcTest.commitment.data);
                            expect(response.proofHeight).toBeDefined();
                            expect(response.proofHeight).not.toBeNull();
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("packetCommitments", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.channel.packetCommitments(ibcTest.portId, ibcTest.channelId)];
                        case 2:
                            response = _b.sent();
                            expect(response.commitments).toEqual([ibcTest.packetState]);
                            expect(response.pagination).toBeDefined();
                            expect(response.height).toBeDefined();
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("allPacketCommitments", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.channel.allPacketCommitments(ibcTest.portId, ibcTest.channelId)];
                        case 2:
                            response = _b.sent();
                            expect(response.commitments).toEqual([ibcTest.packetState]);
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("packetReceipt", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.channel.packetReceipt(ibcTest.portId, ibcTest.channelId, 1)];
                        case 2:
                            response = _b.sent();
                            expect(response.received).toEqual(false);
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("packetAcknowledgement", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            pending("We don't have an acknowledgement for testing at the moment");
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.channel.packetAcknowledgement(ibcTest.portId, ibcTest.channelId, ibcTest.commitment.sequence)];
                        case 2:
                            response = _b.sent();
                            expect(response.acknowledgement).toEqual(ibcTest.packetAcknowledgements[0].data);
                            expect(response.proofHeight).toBeDefined();
                            expect(response.proofHeight).not.toBeNull();
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("packetAcknowledgements", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.channel.packetAcknowledgements(ibcTest.portId, ibcTest.channelId)];
                        case 2:
                            response = _b.sent();
                            expect(response.acknowledgements).toEqual(ibcTest.packetAcknowledgements);
                            expect(response.pagination).toBeDefined();
                            expect(response.height).toBeDefined();
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("allPacketAcknowledgements", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.channel.allPacketAcknowledgements(ibcTest.portId, ibcTest.channelId)];
                        case 2:
                            response = _b.sent();
                            expect(response.acknowledgements).toEqual(ibcTest.packetAcknowledgements);
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("unreceivedPackets", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.channel.unreceivedPackets(ibcTest.portId, ibcTest.channelId, [1, 2, 3])];
                        case 2:
                            response = _b.sent();
                            expect(response.sequences).toEqual([1, 2, 3].map(function (n) { return long_1["default"].fromInt(n, true); }));
                            expect(response.height).toBeDefined();
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("unreceivedAcks", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.channel.unreceivedAcks(ibcTest.portId, ibcTest.channelId, [1, 2, 3, 4, 5, 6, 7])];
                        case 2:
                            response = _b.sent();
                            expect(response.sequences).toEqual([long_1["default"].fromInt(ibcTest.commitment.sequence, true)]);
                            expect(response.height).toBeDefined();
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("nextSequenceReceive", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.channel.nextSequenceReceive(ibcTest.portId, ibcTest.channelId)];
                        case 2:
                            response = _b.sent();
                            expect(response.nextSequenceReceive).toEqual(long_1["default"].fromInt(1, true));
                            expect(response.proofHeight).toBeDefined();
                            expect(response.proofHeight).not.toBeNull();
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe("client", function () {
        describe("state", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.client.state(ibcTest.clientId)];
                        case 2:
                            response = _b.sent();
                            expect(response.clientState).toEqual({
                                typeUrl: "/ibc.lightclients.tendermint.v1.ClientState",
                                value: jasmine.any(Uint8Array)
                            });
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("states", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.client.states()];
                        case 2:
                            response = _b.sent();
                            expect(response.clientStates).toEqual([
                                {
                                    clientId: ibcTest.clientId,
                                    clientState: {
                                        typeUrl: "/ibc.lightclients.tendermint.v1.ClientState",
                                        value: jasmine.any(Uint8Array)
                                    }
                                },
                            ]);
                            expect(response.pagination).toBeDefined();
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("allStates", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.client.allStates()];
                        case 2:
                            response = _b.sent();
                            expect(response.clientStates).toEqual([
                                {
                                    clientId: ibcTest.clientId,
                                    clientState: {
                                        typeUrl: "/ibc.lightclients.tendermint.v1.ClientState",
                                        value: jasmine.any(Uint8Array)
                                    }
                                },
                            ]);
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("consensusState", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.client.consensusState(ibcTest.clientId)];
                        case 2:
                            response = _b.sent();
                            expect(response.consensusState).toEqual({
                                typeUrl: "/ibc.lightclients.tendermint.v1.ConsensusState",
                                value: jasmine.any(Uint8Array)
                            });
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("consensusStates", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.client.consensusStates(ibcTest.clientId)];
                        case 2:
                            response = _b.sent();
                            expect(response.consensusStates).toEqual(jasmine.arrayContaining([
                                {
                                    height: jasmine.anything(),
                                    consensusState: {
                                        typeUrl: "/ibc.lightclients.tendermint.v1.ConsensusState",
                                        value: jasmine.any(Uint8Array)
                                    }
                                },
                            ]));
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("allConsensusStates", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.client.allConsensusStates(ibcTest.clientId)];
                        case 2:
                            response = _b.sent();
                            expect(response.consensusStates).toEqual(jasmine.arrayContaining([
                                {
                                    height: jasmine.anything(),
                                    consensusState: {
                                        typeUrl: "/ibc.lightclients.tendermint.v1.ConsensusState",
                                        value: jasmine.any(Uint8Array)
                                    }
                                },
                            ]));
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("params", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.client.params()];
                        case 2:
                            response = _b.sent();
                            expect(response.params).toEqual({
                                allowedClients: ["06-solomachine", "07-tendermint"]
                            });
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("stateTm", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.client.stateTm(ibcTest.clientId)];
                        case 2:
                            response = _b.sent();
                            expect(response.chainId).toEqual("ibc-1");
                            // TODO: Fill these expectations out
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("statesTm", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.client.statesTm()];
                        case 2:
                            response = _b.sent();
                            expect(response).toEqual(jasmine.arrayContaining([
                                jasmine.objectContaining({
                                    chainId: "ibc-1"
                                }),
                            ]));
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("allStatesTm", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.client.allStatesTm()];
                        case 2:
                            response = _b.sent();
                            expect(response).toEqual(jasmine.arrayContaining([
                                jasmine.objectContaining({
                                    chainId: "ibc-1"
                                }),
                            ]));
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("consensusStateTm", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.client.consensusStateTm(ibcTest.clientId)];
                        case 2:
                            response = _b.sent();
                            expect(response.nextValidatorsHash).toEqual(jasmine.any(Uint8Array));
                            // TODO: Fill out these expectations
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe("connection", function () {
        describe("connection", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.connection.connection(ibcTest.connectionId)];
                        case 2:
                            response = _b.sent();
                            expect(response.connection).toEqual(ibcTest.connection);
                            expect(response.proofHeight).toBeDefined();
                            expect(response.proofHeight).not.toBeNull();
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("connections", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.connection.connections()];
                        case 2:
                            response = _b.sent();
                            expect(response.connections).toEqual([ibcTest.identifiedConnection]);
                            expect(response.pagination).toBeDefined();
                            expect(response.height).toBeDefined();
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("allConnections", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.connection.allConnections()];
                        case 2:
                            response = _b.sent();
                            expect(response.connections).toEqual([ibcTest.identifiedConnection]);
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("clientConnections", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.connection.clientConnections(ibcTest.clientId)];
                        case 2:
                            response = _b.sent();
                            expect(response.connectionPaths).toEqual([ibcTest.connectionId]);
                            expect(response.proofHeight).toBeDefined();
                            expect(response.proofHeight).not.toBeNull();
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("clientState", function () {
            it("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.connection.clientState(ibcTest.connectionId)];
                        case 2:
                            response = _b.sent();
                            expect(response.identifiedClientState).toEqual({
                                clientId: ibcTest.clientId,
                                clientState: {
                                    typeUrl: "/ibc.lightclients.tendermint.v1.ClientState",
                                    value: jasmine.any(Uint8Array)
                                }
                            });
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("consensusState", function () {
            xit("works", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, client, tmClient, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, testutils_spec_1.pendingWithoutSimapp42)();
                            return [4 /*yield*/, makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl)];
                        case 1:
                            _a = _b.sent(), client = _a[0], tmClient = _a[1];
                            return [4 /*yield*/, client.ibc.connection.consensusState(ibcTest.connectionId, 1, 1)];
                        case 2:
                            response = _b.sent();
                            expect(response.clientId).toEqual(ibcTest.clientId);
                            expect(response.consensusState).toEqual({
                                typeUrl: "/ibc.lightclients.tendermint.v1.ConsensusState",
                                value: jasmine.any(Uint8Array)
                            });
                            tmClient.disconnect();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
