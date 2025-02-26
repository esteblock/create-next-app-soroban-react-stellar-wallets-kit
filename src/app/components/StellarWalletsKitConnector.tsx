"use client";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentNetwork = WalletNetwork.TESTNET;

  // ✅ Create an instance of StellarWalletsKit
  const kit: StellarWalletsKit = new StellarWalletsKit({
    network: currentNetwork, // Default to TESTNET
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
  async function handleGetAddressClick() {
    try {
      const { address } = await kit.getAddress();
      console.log("🚀 ~ handleGetAddressClick ~ address:", address)
      setWalletAddress(address);
    } catch (error) {
      console.error(`Error getting address:`, error);
    }
  }

  async function handleDisconnect() {
    try {
      await kit.disconnect();
      setWalletAddress(null);
      setIsMenuOpen(false);
      console.log("Disconnected from wallet.");
    } catch (error) {
      console.error(`Error disconnecting ${walletName}:`, error);
    }
  }

  return (
    <div className="connector-container">
      <h2 className="connector-title">{walletName}</h2>

      {!walletAddress ? (
        <button onClick={handleClick} className="button button-primary">
          Connect {walletName}
        </button>
      ) : (
        <div className="relative flex flex-col items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="button button-secondary">
            <span className="text-sm">{currentNetwork}</span>
          </button>

          {isMenuOpen && (
            <div className="dropdown">
              <button onClick={handleDisconnect} className="dropdown-item-danger">
                Disconnect
              </button>
            </div>
          )}

          {/* ✅ Display Wallet Address */}
          <div className="address-box">
            <p className="text-sm font-medium">Your Address:</p>
            <p className="text-xs break-all">{walletAddress}</p>
          </div>
          <button onClick={handleGetAddressClick} className="button button-primary">
          Get Address from Wallet Again
        </button>
        </div>
      )}
    </div>
  );
}
