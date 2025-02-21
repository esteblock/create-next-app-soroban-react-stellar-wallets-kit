"use client"; // ✅ Makes this a Client Component

import { useState } from "react";
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

  // ✅ Create a separate instance of StellarWalletsKit
    
    const kit: StellarWalletsKit = new StellarWalletsKit({
        network: WalletNetwork.TESTNET,
        selectedWalletId: XBULL_ID,
        modules: allowAllModules(),
    });

  async function handleClick() {
    try {
      await kit.openModal({
        onWalletSelected: async (option: ISupportedWallet) => {
          kit.setWallet(option.id);
          const { address } = await kit.getAddress();
          setWalletAddress(address);
        },
      });
    } catch (error) {
      console.error(`Error connecting ${walletName}:`, error);
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-4 border border-gray-300 rounded-lg">
      <h2 className="text-lg font-bold">{walletName}</h2>
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Connect {walletName}
      </button>
      {/* ✅ Centered and styled wallet address */}
      {walletAddress && (
        <div className="bg-green-100 text-green-700 p-3 rounded-md w-full max-w-xs text-center">
          <p className="text-sm font-medium">Your Address:</p>
          <p className="text-xs break-all">{walletAddress}</p>
        </div>
      )}
    </div>
  );
}
