"use client";

import Image from "next/image";
import { useState } from "react";
import StellarWalletsKitConnector from "./components/StellarWalletsKitConnector";
// Ensure the file exists at the specified path
// If the path is incorrect, update it to the correct path



export default function Home() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Wallet Connection</h1>

      {/* ✅ Two Wallet Instances in Two Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
        <StellarWalletsKitConnector walletName="Wallet A" />
        <StellarWalletsKitConnector walletName="Wallet B" />
      </div>
    </div>
  );
}
