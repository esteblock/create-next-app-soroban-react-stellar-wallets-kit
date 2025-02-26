"use client";
import { useState } from "react";
import { useSorobanReact } from "soroban-react-stellar-wallets-kit";

export const ConnectButton = () => {
  const { activeNetwork, address, disconnect, connect } = useSorobanReact();
  const [isOpen, setIsOpen] = useState(false);

  return !address ? (
    <button onClick={connect} className="button button-primary w-full">
      Connect Wallet
    </button>
  ) : (
    <div className="relative w-full">
      <button onClick={() => setIsOpen(!isOpen)} className="button button-secondary w-full">
        {activeNetwork || "Unknown Chain"}
      </button>

      {isOpen && (
        <div className="dropdown w-full">
          <button onClick={disconnect} className="dropdown-item-danger">
            Disconnect
          </button>
        </div>
      )}

      <p className="address-box">{address}</p>
    </div>
  );
};
