"use client";

import { useState } from "react";
import { useSorobanReact } from "@soroban-react/core";

export const ConnectButton = () => {
  const sorobanContext = useSorobanReact();
  const { activeNetwork, address, disconnect, connect } = sorobanContext;
  const [isOpen, setIsOpen] = useState(false);

  if (!address)
    return (
      <div className="relative flex flex-col items-center">        <button onClick={() => connect()} className="button button-primary">
          Connect Wallet
        </button>
      </div>
    );

  return (
    <div className="relative flex flex-col items-center">

      <button onClick={() => setIsOpen(!isOpen)} className="button button-secondary">
        <span className="text-sm">{activeNetwork || "Unknown Chain"}</span>
      </button>

      {isOpen && (
        <div className="dropdown">
          <button
            onClick={async () => {
              console.log("Disconnecting...");
              await disconnect();
              alert("Disconnected successfully.");
              setIsOpen(false);
            }}
            className="dropdown-item-danger"
          >
            Disconnect
          </button>
        </div>
      )}

      {address && (
        <div className="address-box">
          <p className="text-sm font-medium">Your Address:</p>
          <p className="text-xs break-all">{address}</p>
        </div>
      )}
    </div>
  );
};
