"use client";

import MySorobanReactProvider from "./components/MySorobanReactProvider"
import { WalletInfo } from "./components/WalletInfo";
import { ConnectButton } from "./components/ConnectButton";
import { GreeterContractInteractions } from "./components/GreeterContractInteractions";

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Wallet Connection</h1>

      {/* ✅ Two Wallet Instances in Two Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
        <MySorobanReactProvider>
          <WalletInfo />
          <ConnectButton/>
          <GreeterContractInteractions/>
        </MySorobanReactProvider>
      </div>
    </div>
  );
}
