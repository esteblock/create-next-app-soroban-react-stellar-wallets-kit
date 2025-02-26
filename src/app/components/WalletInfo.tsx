"use client";
import { useSorobanReact } from "soroban-react-stellar-wallets-kit";
import { truncateAddress } from "../utils";

export const WalletInfo = () => {
  const { activeNetwork, address, selectedModuleId } = useSorobanReact();

  return (
    <div className="card text-center w-full">
      <h2 className="text-lg font-semibold text-white">Network</h2>
      <p className="text-sm text-white">{activeNetwork || "Unknown Chain"}</p>
      <br />
      
      <h2 className="text-lg font-semibold text-white">Your Address</h2>
      <p className="text-sm text-white">{truncateAddress(address) || "No Address Connected"}</p>
      <br />

      <h2 className="text-lg font-semibold text-white">Wallet Connected</h2>
      <p className="text-sm text-white">{selectedModuleId || "No Wallet Connected" }</p>
    </div>
  );
};
