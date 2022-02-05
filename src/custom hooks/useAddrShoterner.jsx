import { useState } from "react";

const useAddrShortener = () => {
  const [shortened, setShortened] = useState("");

  function shorten(addr) {
    setShortened(`${addr.slice(0, 6)}...${addr.slice(-4)}`);
  }

  return {
    shortened,
    shorten,
  };
};

export default useAddrShortener;
