"use client"; // ✅ Makes this a Client Component
import React from "react";
import { useSorobanReact } from "@soroban-react/core";
import { GreeterContractInteractions } from "./GreeterContractInteractions";

import { ConnectButton } from "./ConnectButton";


interface SorobanReactConnectorProps {
  walletName: string;
}

export default function SorobanReactConnector({ walletName }: SorobanReactConnectorProps) {
  const sorobanContext = useSorobanReact();
  const { address } = sorobanContext;

  return (
    <div className="connector-container">
      <h2 className="connector-title">{walletName}</h2>

      {/* ✅ Centered and styled wallet address */}
      {address && (
        <div className="address-box">
          <p className="text-sm font-medium">Your Address:</p>
          <p className="text-xs break-all">{address }</p>
        </div>
      )}

      <ConnectButton />
      
      {/* ✅ Display Contract Interactions */}
      <GreeterContractInteractions />
    </div>
  );
}
