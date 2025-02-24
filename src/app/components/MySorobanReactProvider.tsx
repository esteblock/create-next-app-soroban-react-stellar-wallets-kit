import React from 'react'
import {SorobanReactProvider, NetworkDetails, WalletNetwork} from '@soroban-react/core';
import deployments from '../deployments.json';

export default function MySorobanReactProvider({children}:{children: React.ReactNode}) { 

  const testnetNetworkDetails : NetworkDetails = {
    network: WalletNetwork.TESTNET,
    sorobanRpcUrl: 'https://soroban-testnet.stellar.org/',
    horizonRpcUrl: 'https://horizon-testnet.stellar.org'
  }

    return (
      <SorobanReactProvider
        appName={"Example Stellar App"}
        allowedNetworkDetails={[testnetNetworkDetails]}
        activeNetwork={WalletNetwork.TESTNET}
        deployments={deployments}>
          {children}
      </SorobanReactProvider>
    )
  }