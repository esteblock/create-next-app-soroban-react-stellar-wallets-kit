"use client";

import { useState } from "react";
import { useSorobanReact } from "@soroban-react/core";
import type { WalletChain } from "@soroban-react/types";

export const ConnectButton = () => {
  const sorobanContext = useSorobanReact();
  const { activeChain, address, disconnect, setActiveConnectorAndConnect, setActiveChain } = sorobanContext;
  const activeAccount = address;
  const browserWallets = sorobanContext.connectors;
  const supportedChains = sorobanContext.chains;
  const [isOpen, setIsOpen] = useState(false);

  const handleContractInteraction = (chain: WalletChain) => {
    if (!chain.name || chain.name.toLowerCase() === "standalone") {
      console.log("Please deploy the contract before proceeding.");
      alert("Please deploy the contract before proceeding.");
    } else {
      setActiveChain && setActiveChain(chain);
      console.log(`Active chain changed to ${chain.name}`);
      alert(`Active chain changed to ${chain.name}`);
    }
  };

  if (!activeAccount)
    return (
      <div className="relative inline-block">
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
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-2 bg-gray-800 text-white font-bold rounded-lg flex items-center justify-between"
      >
        <div className="flex flex-col">
          <span className="text-sm">{activeChain?.name}</span>
          <span className="text-xs opacity-75">{address}</span>
        </div>
        <span className="ml-2">▼</span>
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
    </div>
  );
};
