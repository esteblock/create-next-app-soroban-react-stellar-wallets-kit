"use client"; // ✅ Makes this a Client Component
import { useState } from "react";

import React from 'react'
import {useSorobanReact} from '@soroban-react/core';
import {futurenet, sandbox, standalone, testnet} from '@soroban-react/chains';
import {freighter} from '@soroban-react/freighter';
import { xbull } from '@soroban-react/xbull';
import { hana } from '@soroban-react/hana';
import { lobstr } from '@soroban-react/lobstr';
import type {ChainMetadata, Connector} from "@soroban-react/types";

import deployments from '../deployments.json';

import { ConnectButton } from "./ConnectButton";

const chains: ChainMetadata[] = [testnet];
const connectors: Connector[] = [freighter(), xbull(), hana(), lobstr()];

interface SorobanReactConnectorProps {
  walletName: string;
}

export default function SorobanReactConnector({ walletName }: SorobanReactConnectorProps) {
  const sorobanContext = useSorobanReact()

  const {activeChain, address, disconnect, setActiveConnectorAndConnect, setActiveChain} = sorobanContext;
  const activeAccount = address;
  const browserWallets = sorobanContext.connectors;
  const supportedChains = sorobanContext.chains;
  
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  async function handleClick() {
    try {
      console.log("Connecting")
    } catch (error) {
      console.error(`Error connecting ${walletName}:`, error);
    }
  }
  return (
    
          <div className="flex flex-col items-center space-y-4 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-lg font-bold">{walletName}</h2>
            {/* ✅ Centered and styled wallet address */}
            {walletAddress && (
              <div className="bg-green-100 text-green-700 p-3 rounded-md w-full max-w-xs text-center">
                <p className="text-sm font-medium">Your Address:</p>
                <p className="text-xs break-all">{walletAddress}</p>
              </div>
            )}
            <ConnectButton/>
          </div>
    
  );
}
