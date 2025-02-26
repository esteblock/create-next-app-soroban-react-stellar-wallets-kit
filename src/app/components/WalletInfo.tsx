"use client";

import { useSorobanReact } from "soroban-react-stellar-wallets-kit";

export const WalletInfo = () => {
  const { activeNetwork, address } = useSorobanReact();

  return (
    <div className="relative flex flex-col items-center">
      <span className="text-sm">{activeNetwork || "Unknown Chain"}</span>
      <div className="address-box">
        <p className="text-sm font-medium">Your Address:</p>
        <p className="text-xs break-all">{address || "No Address Connected"}</p>
      </div>
    </div>
  );
};
