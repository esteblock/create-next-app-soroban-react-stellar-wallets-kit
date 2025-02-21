"use client";

import Image from "next/image";
import { useState } from "react";
import StellarWalletsKitConnector from "./components/StellarWalletsKitConnector";

import MySorobanReactProvider from "./components/MySorobanReactProvider"
import SorobanReactConnector from "./components/SorobanReactConnector";


export default function Home() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Wallet Connection</h1>

      {/* ✅ Two Wallet Instances in Two Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
        <StellarWalletsKitConnector walletName="Stellar Wallets Kit" />
        <MySorobanReactProvider>
          <SorobanReactConnector walletName="@soroban-react" />
        </MySorobanReactProvider>
      </div>
    </div>
  );
}
