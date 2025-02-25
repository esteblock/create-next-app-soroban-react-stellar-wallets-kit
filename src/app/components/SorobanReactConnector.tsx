"use client"; // ✅ Makes this a Client Component
import { useState } from "react";
import React from "react";
import { useSorobanReact } from "soroban-react-stellar-wallets-kit";
import { testnet } from "@soroban-react/chains";
import { freighter } from "@soroban-react/freighter";
import { xbull } from "@soroban-react/xbull";
import { hana } from "@soroban-react/hana";
import { lobstr } from "@soroban-react/lobstr";
import type { ChainMetadata, Connector } from "@soroban-react/types";
import { GreeterContractInteractions } from "./GreeterContractInteractions";

import { ConnectButton } from "./ConnectButton";

const chains: ChainMetadata[] = [testnet];
const connectors: Connector[] = [freighter(), xbull(), hana(), lobstr()];

interface SorobanReactConnectorProps {
  walletName: string;
}

export default function SorobanReactConnector({ walletName }: SorobanReactConnectorProps) {
  const sorobanContext = useSorobanReact();
  const { address } = sorobanContext;

  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  async function handleClick() {
    try {
      console.log("Connecting");
    } catch (error) {
      console.error(`Error connecting ${walletName}:`, error);
    }
  }

  return (
    <div className="connector-container">
      <h2 className="connector-title">{walletName}</h2>

      {/* ✅ Centered and styled wallet address */}
      {walletAddress && (
        <div className="address-box">
          <p className="text-sm font-medium">Your Address:</p>
          <p className="text-xs break-all">{walletAddress}</p>
        </div>
      )}

      <ConnectButton />
      
      {/* ✅ Display Contract Interactions */}
      <GreeterContractInteractions />
    </div>
  );
}
