"use client";

import MySorobanReactProvider from "./components/MySorobanReactProvider";
import { WalletInfo } from "./components/WalletInfo";
import { ConnectButton } from "./components/ConnectButton";
import { GreeterContractInteractions } from "./components/GreeterContractInteractions";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background text-foreground">
      <h1 className="connector-title bg-transparent p-2">Soroban React Stellar Wallets Kit</h1>

      <MySorobanReactProvider>
        <div className="connector-container w-full max-w-md">
          <WalletInfo />
          <GreeterContractInteractions />
          <ConnectButton />
        </div>
      </MySorobanReactProvider>
    </div>
  );
}
