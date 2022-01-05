"use strict";
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
exports.makeMultisignedTx = exports.makeCompactBitArray = void 0;
var amino_1 = require("@cosmjs/amino");
var encoding_1 = require("@cosmjs/encoding");
var proto_signing_1 = require("@cosmjs/proto-signing");
var multisig_1 = require("cosmjs-types/cosmos/crypto/multisig/v1beta1/multisig");
var signing_1 = require("cosmjs-types/cosmos/tx/signing/v1beta1/signing");
var tx_1 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
var tx_2 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
var long_1 = require("long");
function makeCompactBitArray(bits) {
    var byteCount = Math.ceil(bits.length / 8);
    var extraBits = bits.length - Math.floor(bits.length / 8) * 8;
    var bytes = new Uint8Array(byteCount); // zero-filled
    bits.forEach(function (value, index) {
        var bytePos = Math.floor(index / 8);
        var bitPos = index % 8;
        // eslint-disable-next-line no-bitwise
        if (value)
            bytes[bytePos] |= 1 << (8 - 1 - bitPos);
    });
    return multisig_1.CompactBitArray.fromPartial({ elems: bytes, extraBitsStored: extraBits });
}
exports.makeCompactBitArray = makeCompactBitArray;
function makeMultisignedTx(multisigPubkey, sequence, fee, bodyBytes, signatures) {
    var addresses = Array.from(signatures.keys());
    var prefix = encoding_1.Bech32.decode(addresses[0]).prefix;
    var signers = Array(multisigPubkey.value.pubkeys.length).fill(false);
    var signaturesList = new Array();
    for (var i = 0; i < multisigPubkey.value.pubkeys.length; i++) {
        var signerAddress = (0, amino_1.pubkeyToAddress)(multisigPubkey.value.pubkeys[i], prefix);
        var signature = signatures.get(signerAddress);
        if (signature) {
            signers[i] = true;
            signaturesList.push(signature);
        }
    }
    var signerInfo = {
        publicKey: (0, proto_signing_1.encodePubkey)(multisigPubkey),
        modeInfo: {
            multi: {
                bitarray: makeCompactBitArray(signers),
                modeInfos: signaturesList.map(function (_) { return ({ single: { mode: signing_1.SignMode.SIGN_MODE_LEGACY_AMINO_JSON } }); })
            }
        },
        sequence: long_1["default"].fromNumber(sequence)
    };
    var authInfo = tx_1.AuthInfo.fromPartial({
        signerInfos: [signerInfo],
        fee: {
            amount: __spreadArray([], fee.amount, true),
            gasLimit: long_1["default"].fromString(fee.gas)
        }
    });
    var authInfoBytes = tx_1.AuthInfo.encode(authInfo).finish();
    var signedTx = tx_2.TxRaw.fromPartial({
        bodyBytes: bodyBytes,
        authInfoBytes: authInfoBytes,
        signatures: [multisig_1.MultiSignature.encode(multisig_1.MultiSignature.fromPartial({ signatures: signaturesList })).finish()]
    });
    return signedTx;
}
exports.makeMultisignedTx = makeMultisignedTx;
