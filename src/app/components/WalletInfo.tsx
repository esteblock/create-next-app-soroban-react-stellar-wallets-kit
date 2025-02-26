"use client";
import { useSorobanReact } from "soroban-react-stellar-wallets-kit";

export const WalletInfo = () => {
  const { activeNetwork, address } = useSorobanReact();

  return (
    <div className="card text-center w-full">
      <h2 className="text-lg font-semibold">Network</h2>
      <p className="text-sm">{activeNetwork || "Unknown Chain"}</p>

      <div className="mt-4">
        <h3 className="text-sm font-medium">Your Address</h3>
        <p className="address-box">{address || "No Address Connected"}</p>
      </div>
    </div>
  );
};
