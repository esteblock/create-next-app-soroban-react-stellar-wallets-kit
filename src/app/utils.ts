export const truncateAddress = (address: string | null | undefined, start = 6, end = 6) => {
    if (!address || address.length < start + end) return address;
    return `${address.slice(0, start)}...${address.slice(-end)}`;
  };
  