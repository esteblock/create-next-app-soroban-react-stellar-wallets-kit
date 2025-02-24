import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";

import { useSorobanReact } from "@soroban-react/core";
import { useRegisteredContract } from "@soroban-react/contracts";
import { xdr, nativeToScVal, scValToNative } from "@stellar/stellar-sdk";

type UpdateGreetingValues = { newMessage: string };

export const GreeterContractInteractions = () => {
  const sorobanContext = useSorobanReact();
  const { activeChain, server, address } = sorobanContext;
  const contract = useRegisteredContract("greeting");

  const [updateIsLoading, setUpdateIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<UpdateGreetingValues>();

  const [fetchedGreeting, setFetchedGreeting] = useState<string | null>(null);
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [currentChain, setCurrentChain] = useState<string | null>(null);

  /** 🔹 Fetch Greeting from Contract */
  const fetchGreeting = useCallback(async () => {
    if (!server || !contract) return;

    const chainName = activeChain?.name?.toLowerCase() || null;
    setCurrentChain(chainName);

    if (!chainName) {
      toast.error("Wallet not connected. Try again…");
      return;
    }

    try {
      const address = contract?.deploymentInfo?.contractAddress;
      setContractAddress(address);

      const result = await contract?.invoke({ method: "read_title", args: [] });
      if (result) {
        setFetchedGreeting(scValToNative(result as xdr.ScVal) as string);
      }
    } catch (e) {
      console.error("Error fetching greeting:", e);
      toast.error("Error while fetching greeting. Try again…");
      setFetchedGreeting(null);
    }
  }, [server, contract, activeChain]);

  /** 🔹 Fetch greeting when the component mounts or updates */
  useEffect(() => {
    setUpdateIsLoading(true);
    fetchGreeting().finally(() => setUpdateIsLoading(false));
  }, [fetchGreeting]);

  /** 🔹 Update Greeting */
  const updateGreeting = async ({ newMessage }: UpdateGreetingValues) => {
    if (!address) return toast.error("Wallet is not connected. Try again...");
    if (!server) return toast.error("Server is not defined. Unable to connect to the blockchain");
    if (!activeChain?.name) return toast.error("Wallet not connected. Try again…");

    setUpdateIsLoading(true);
    try {
      const result = await contract?.invoke({
        method: "set_title",
        args: [nativeToScVal(newMessage, { type: "string" })],
        signAndSend: true,
      });

      if (result) {
        toast.success("New greeting successfully published!");
        fetchGreeting(); // Refresh the greeting
      } else {
        toast.error("Greeting update unsuccessful...");
      }
    } catch (e) {
      console.error("Error updating greeting:", e);
      toast.error("Error while sending transaction. Try again…");
    } finally {
      setUpdateIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 max-w-[20rem]">
      <h2 className="text-center">Greeter Smart Contract</h2>

      {contractAddress ? (
        <>
          {/* Greeting Display */}
          <div className="card">
            <p className="font-semibold">Fetched Greeting:</p>
            <p>{fetchedGreeting || "Loading..."}</p>
          </div>

          {/* Contract Address Link */}
          <p className="contract-link">
            <Link href={`https://stellar.expert/explorer/testnet/contract/${contractAddress}`} target="_blank">
              {contractAddress}
            </Link>
          </p>

          
        </>
      ) : (
        <div className="card">Loading Smart Contract...</div>
      )}

      {contractAddress && address && 
      <div className="card">
      <form onSubmit={handleSubmit(updateGreeting)}>
        <div className="stack">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Update Greeting:</label>
            <input className="input text-black" disabled={updateIsLoading} {...register("newMessage")} />
          </div>
          <button
            type="submit"
            className={updateIsLoading ? "button button-disabled" : "button button-primary"}
            disabled={updateIsLoading}
          >
            {updateIsLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
      }

      {currentChain && <p className="text-center">Current Chain: {currentChain}</p>}
    </div>
  );
};
