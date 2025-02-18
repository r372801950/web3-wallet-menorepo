import {useAccount} from "wagmi";
import {useEffect} from "react";
import InfoContractInteraction from "@components/InfoContractInteraction";

const DappTest = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  useEffect(()=>{
    console.log('桔子', address)
  }, [address])
  if(isConnecting) return <div>Connecting...</div>;
  if(isDisconnected) return <div>isDisconnected...</div>;
  return <InfoContractInteraction />
};
export default DappTest;
