"use client";

import { useState } from "react";
import { useSorobanReact } from "@soroban-react/core";

export const ConnectButton = () => {
  const sorobanContext = useSorobanReact();
  const { activeChain, address, disconnect, setActiveConnectorAndConnect } = sorobanContext;
  const activeAccount = address;
  const browserWallets = sorobanContext.connectors;
  const [isOpen, setIsOpen] = useState(false);

  if (!activeAccount)
    return (
      <div className="relative flex flex-col items-center">
        <button onClick={() => setIsOpen(!isOpen)} className="button button-primary">
          Connect Wallet
        </button>

        {isOpen && (
          <div className="dropdown">
            {browserWallets.map((w) => (
              <button
                key={w.name}
                onClick={() => {
                  if (setActiveConnectorAndConnect) {
                    setActiveConnectorAndConnect(w);
                  }
                  setIsOpen(false);
                }}
                className="dropdown-item"
              >
                {w.name}
              </button>
            ))}
          </div>
        )}
      </div>
    );

  return (
    <div className="relative flex flex-col items-center">
      <button onClick={() => setIsOpen(!isOpen)} className="button button-secondary">
        <span className="text-sm">{activeChain?.name || "Unknown Chain"}</span>
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

      {activeAccount && (
        <div className="address-box">
          <p className="text-sm font-medium">Your Address:</p>
          <p className="text-xs break-all">{address}</p>
        </div>
      )}
    </div>
  );
};
