import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSorobanReact, useRegisteredContract } from "soroban-react-stellar-wallets-kit";
import { xdr, nativeToScVal, scValToNative } from "@stellar/stellar-sdk";

export const GreeterContractInteractions = () => {
  const { activeNetwork, sorobanServer, address } = useSorobanReact();
  const contract = useRegisteredContract("greeting");

  const [updateIsLoading, setUpdateIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<{ newMessage: string }>();
  const [fetchedGreeting, setFetchedGreeting] = useState<string | null>(null);
  const [contractAddress, setContractAddress] = useState<string | null>(null);

  /** Fetch Greeting */
  const fetchGreeting = useCallback(async () => {
    if (!sorobanServer || !contract) return;

    try {
      const addr = contract?.deploymentInfo?.contractAddress;
      setContractAddress(addr);

      const result = await contract?.invoke({ method: "read_title", args: [] });
      if (result) setFetchedGreeting(scValToNative(result as xdr.ScVal) as string);
    } catch {
      toast.error("Error fetching greeting.");
      setFetchedGreeting(null);
    }
  }, [sorobanServer, contract]);

  useEffect(() => {
    setUpdateIsLoading(true);
    fetchGreeting().finally(() => setUpdateIsLoading(false));
  }, [fetchGreeting]);

  /** Update Greeting */
  const updateGreeting = async ({ newMessage }: { newMessage: string }) => {
    if (!address) return toast.error("Wallet not connected.");
    if (!sorobanServer) return toast.error("Soroban server not available.");

    setUpdateIsLoading(true);
    try {
      const result = await contract?.invoke({
        method: "set_title",
        args: [nativeToScVal(newMessage, { type: "string" })],
        signAndSend: true,
      });

      if (result) {
        toast.success("Greeting updated!");
        fetchGreeting();
      } else {
        toast.error("Update failed.");
      }
    } catch {
      toast.error("Transaction failed.");
    } finally {
      setUpdateIsLoading(false);
    }
  };

  return (
    <div className="card w-full">
      <h2 className="text-lg font-semibold text-white">Greeter Smart Contract</h2>

      {contractAddress ? (
        <>
          <div className="card mt-4">
            <p className="font-semibold text-white">Fetched Greeting:</p>
            <p className="text-white">{fetchedGreeting || "Loading..."}</p>
          </div>
          <Link href={`https://stellar.expert/explorer/testnet/contract/${contractAddress}`} target="_blank" className="contract-link mt-2 block text-white">
            {contractAddress}
          </Link>
        </>
      ) : (
        <p className="text-white mt-2">Loading Smart Contract...</p>
      )}

      {contractAddress && address && (
        <form onSubmit={handleSubmit(updateGreeting)} className="mt-4">
          <label className="text-sm font-medium text-white">Update Greeting:</label>
          <input className="input mt-2 text-white" disabled={updateIsLoading} {...register("newMessage")} />
          <button type="submit" disabled={updateIsLoading} className="button button-primary w-full mt-2">
            {updateIsLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      )}

      {activeNetwork && <p className="text-white text-sm mt-2">Current Chain: {activeNetwork}</p>}
    </div>
  );
};