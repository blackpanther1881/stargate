"use strict";
// Base symbols
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.decodeCosmosSdkDecFromProto = exports.createProtobufRpcClient = exports.createPagination = exports.setupTxExtension = exports.setupStakingExtension = exports.setupMintExtension = exports.setupIbcExtension = exports.setupGovExtension = exports.setupDistributionExtension = exports.setupBankExtension = exports.setupAuthExtension = exports.QueryClient = void 0;
var queryclient_1 = require("./queryclient");
__createBinding(exports, queryclient_1, "QueryClient");
// Extensions
var auth_1 = require("./auth");
__createBinding(exports, auth_1, "setupAuthExtension");
var bank_1 = require("./bank");
__createBinding(exports, bank_1, "setupBankExtension");
var distribution_1 = require("./distribution");
__createBinding(exports, distribution_1, "setupDistributionExtension");
var gov_1 = require("./gov");
__createBinding(exports, gov_1, "setupGovExtension");
var ibc_1 = require("./ibc");
__createBinding(exports, ibc_1, "setupIbcExtension");
var mint_1 = require("./mint");
__createBinding(exports, mint_1, "setupMintExtension");
var staking_1 = require("./staking");
__createBinding(exports, staking_1, "setupStakingExtension");
var tx_1 = require("./tx");
__createBinding(exports, tx_1, "setupTxExtension");
var utils_1 = require("./utils");
__createBinding(exports, utils_1, "createPagination");
__createBinding(exports, utils_1, "createProtobufRpcClient");
__createBinding(exports, utils_1, "decodeCosmosSdkDecFromProto");
