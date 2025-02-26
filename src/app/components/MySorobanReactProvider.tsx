import React from 'react'
import {
  SorobanReactProvider, 
  NetworkDetails, 
  WalletNetwork
} from 'soroban-react-stellar-wallets-kit';
import deployments from '../deployments.json';

export default function MySorobanReactProvider({children}:{children: React.ReactNode}) { 

  const mainnetNetworkDetails : NetworkDetails = {
    network: WalletNetwork.PUBLIC,
    sorobanRpcUrl: 'https://soroban-rpc.creit.tech/',
    horizonRpcUrl: 'https://horizon.stellar.org'
  }

  const testnetNetworkDetails : NetworkDetails = {
    network: WalletNetwork.TESTNET,
    sorobanRpcUrl: 'https://soroban-testnet.stellar.org/',
    horizonRpcUrl: 'https://horizon-testnet.stellar.org'
  }

    return (
      <SorobanReactProvider
        appName={"Example Stellar App"}
        allowedNetworkDetails={[mainnetNetworkDetails, testnetNetworkDetails]}
        activeNetwork={WalletNetwork.TESTNET}
        deployments={deployments}
      >
          {children}
      </SorobanReactProvider>
    )
  }