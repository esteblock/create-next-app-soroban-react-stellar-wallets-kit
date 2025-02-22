"use client";

import { useState, useEffect } from "react";
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  ISupportedWallet,
  XBULL_ID
} from "@creit.tech/stellar-wallets-kit";

interface StellarWalletsKitConnectorProps {
  walletName: string;
}

export default function StellarWalletsKitConnector({ walletName }: StellarWalletsKitConnectorProps) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [currentNetwork, setCurrentNetwork] = useState<any | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ Create an instance of StellarWalletsKit
  const kit: StellarWalletsKit = new StellarWalletsKit({
    network: WalletNetwork.TESTNET, // Default to TESTNET
    selectedWalletId: XBULL_ID,
    modules: allowAllModules(),
  });

  async function handleClick() {
    try {
      await kit.openModal({
        onWalletSelected: async (option: ISupportedWallet) => {
          kit.setWallet(option.id);
          const { address } = await kit.getAddress();
          const { network } = await kit.getNetwork();
          console.log("🚀 ~ onWalletSelected: ~ network:", network)
          setWalletAddress(address);
          setCurrentNetwork(network);
        },
      });
    } catch (error) {
        console.error(`Error connecting ${walletName}:`, error);
    }
  }

  async function handleDisconnect() {
    try {
        await kit.disconnect();        
        setWalletAddress(null);
        setIsMenuOpen(false);
        console.log("Disconnected from wallet.");
    }
    catch (error) {
        console.error(`Error disconnecting ${walletName}:`, error);
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-4 border border-gray-300 rounded-lg">
      <h2 className="text-lg font-bold">{walletName}</h2>

      {!walletAddress ? (
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Connect {walletName}
        </button>
      ) : (
        <div className="relative flex flex-col items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="px-6 py-2 bg-gray-800 text-white font-bold rounded-lg"
          >
            <span className="text-sm">
              {currentNetwork }
            </span>
          </button>

          {isMenuOpen && (
            <div className="absolute mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg">
              <button
                onClick={handleDisconnect}
                className="block w-full px-4 py-2 text-left text-red-400 hover:bg-gray-800"
              >
                Disconnect
              </button>
            </div>
          )}

          {/* ✅ Display Wallet Address */}
          <div className="mt-4 w-full max-w-xs bg-green-100 text-green-700 p-3 rounded-md text-center">
            <p className="text-sm font-medium">Your Address:</p>
            <p className="text-xs break-all">{walletAddress}</p>
          </div>
        </div>
      )}
    </div>
  );
}
