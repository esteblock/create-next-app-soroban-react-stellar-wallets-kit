"use client";

import { useState } from "react";
import { useSorobanReact } from "@soroban-react/core";
import type { WalletChain } from "@soroban-react/types";

export const ConnectButton = () => {
  const sorobanContext = useSorobanReact();
  const { activeChain, address, disconnect, setActiveConnectorAndConnect, setActiveChain } =
    sorobanContext;
  const activeAccount = address;
  const browserWallets = sorobanContext.connectors;
  const [isOpen, setIsOpen] = useState(false);

  if (!activeAccount)
    return (
      <div className="relative flex flex-col items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700"
        >
          Connect Wallet
        </button>

        {isOpen && (
          <div className="absolute mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg">
            {browserWallets.map((w) => (
              <button
                key={w.name}
                onClick={() => {
                  setActiveConnectorAndConnect && setActiveConnectorAndConnect(w);
                  setIsOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-white hover:bg-gray-800"
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-2 bg-gray-800 text-white font-bold rounded-lg"
      >
        <span className="text-sm">{activeChain?.name || "Unknown Chain"}</span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg">
          <button
            onClick={async () => {
              console.log("Disconnecting...");
              await disconnect();
              alert("Disconnected successfully.");
              setIsOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-red-400 hover:bg-gray-800"
          >
            Disconnect
          </button>
        </div>
      )}

      {/* ✅ Address Box - Now properly contained inside the column */}
      {activeAccount && (
        <div className="mt-4 w-full max-w-xs bg-green-100 text-green-700 p-3 rounded-md text-center">
          <p className="text-sm font-medium">Your Address:</p>
          <p className="text-xs break-all">{address}</p>
        </div>
      )}
    </div>
  );
}
