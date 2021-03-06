import { StdFee } from "@cosmjs/amino";
import { Decimal } from "@cosmjs/math";
/**
 * A gas price, i.e. the price of a single unit of gas. This is typically a fraction of
 * the smallest fee token unit, such as 0.012utoken.
 *
 * This is the same as GasPrice from @cosmjs/launchpad but those might diverge in the future.
 */
export declare class GasPrice {
    readonly amount: Decimal;
    readonly denom: string;
    constructor(amount: Decimal, denom: string);
    /**
     * Parses a gas price formatted as `<amount><denom>`, e.g. `GasPrice.fromString("0.012utoken")`.
     *
     * The denom must match the Cosmos SDK 0.42 pattern (https://github.com/cosmos/cosmos-sdk/blob/v0.42.4/types/coin.go#L599-L601).
     * See `GasPrice` in @cosmjs/stargate for a more generic matcher.
     *
     * Separators are not yet supported.
     */
    static fromString(gasPrice: string): GasPrice;
}
export declare function calculateFee(gasLimit: number, gasPrice: GasPrice | string): StdFee;
