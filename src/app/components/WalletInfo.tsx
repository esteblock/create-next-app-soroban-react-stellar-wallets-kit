"use client";
import { useSorobanReact } from "soroban-react-stellar-wallets-kit";
import { truncateAddress } from "../utils";

export const WalletInfo = () => {
  const { activeNetwork, address } = useSorobanReact();

  return (
    <div className="card text-center w-full">
      <h2 className="text-lg font-semibold text-white">Network</h2>
      <p className="text-sm text-white">{activeNetwork || "Unknown Chain"}</p>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-white">Your Address</h3>
        <p className="address-box">{truncateAddress(address) || "No Address Connected"}</p>
      </div>
    </div>
  );
};
