"use client";
import { useSorobanReact } from "soroban-react-stellar-wallets-kit";
import { truncateAddress } from "../utils";

export const ConnectButton = () => {
  const { address, disconnect, connect } = useSorobanReact();

  return !address ? (
    <button onClick={connect} className="button button-primary w-full">
      Connect Wallet
    </button>
  ) : (
    <div className="w-full flex flex-col items-center">
      <p className="address-box">{truncateAddress(address)}</p>
      <button onClick={disconnect} className="button button-green w-full mt-2">
        Disconnect
      </button>
    </div>
  );
};
