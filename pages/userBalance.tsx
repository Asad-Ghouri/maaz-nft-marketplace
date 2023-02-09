import {
    ThirdwebNftMedia,
    useAddress,
    useMetamask,
    useTokenBalance,
    useOwnedNFTs,
    useContract,
  } from "@thirdweb-dev/react";
  import { BigNumber, ethers } from "ethers";
  import type { NextPage } from "next";
  import { useEffect, useState } from "react";
  import styles from "../styles/Theme.module.css";
  
  const nftDropContractAddress = "0x322067594DBCE69A9a9711BC393440aA5e3Aaca1";
  const tokenContractAddress = "0x8C1Fc0162555ac29864A0E6f695582e63ABCd39e";
  const stakingContractAddress = "0xB712975e13427ac804177E7CebF08781bbF9B89c";
  
  const Stake: NextPage = () => {
    // Wallet Connection Hooks
    const address = useAddress();
    const connectWithMetamask = useMetamask();
  
    // Contract Hooks
    const { contract: nftDropContract } = useContract(
      nftDropContractAddress,
      "nft-drop"
    );
  
    const { contract: tokenContract } = useContract(
      tokenContractAddress,
      "token"
    );
  
    const { contract, isLoading } = useContract(stakingContractAddress);
  
    // Load Unstaked NFTs
    const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);
  
    // Load Balance of Token
    const { data: tokenBalance } = useTokenBalance(tokenContract, address);
  
    ///////////////////////////////////////////////////////////////////////////
    // Custom contract functions
    ///////////////////////////////////////////////////////////////////////////
    const [stakedNfts, setStakedNfts] = useState<any[]>([]);
    const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
  
    useEffect(() => {
      if (!contract) return;
  
      async function loadStakedNfts() {
        const stakedTokens = await contract?.call("getStakedTokens", address);
  
        // For each staked token, fetch it from the sdk
        const stakedNfts = await Promise.all(
          stakedTokens?.map(
            async (stakedToken: { staker: string; tokenId: BigNumber }) => {
              const nft = await nftDropContract?.get(stakedToken.tokenId);
              return nft;
            }
          )
        );
  
        setStakedNfts(stakedNfts);
        console.log("setStakedNfts", stakedNfts);
      }
  
      if (address) {
        loadStakedNfts();
      }
    }, [address, contract, nftDropContract]);
  
    useEffect(() => {
      if (!contract || !address) return;
  
      async function loadClaimableRewards() {
        const cr = await contract?.call("availableRewards", address);
        console.log("Loaded claimable rewards", cr);
        setClaimableRewards(cr);
      }
  
      loadClaimableRewards();
    }, [address, contract]);
  
    ///////////////////////////////////////////////////////////////////////////
    // Write Functions
    ///////////////////////////////////////////////////////////////////////////
    async function stakeNft(id: string) {
      if (!address) return;
  
      const isApproved = await nftDropContract?.isApproved(
        address,
        stakingContractAddress
      );
      // If not approved, request approval
      if (!isApproved) {
        await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
      }
      const stake = await contract?.call("stake", id);
    }
  
    async function withdraw(id: BigNumber) {
      const withdraw = await contract?.call("withdraw", id);
    }
  
    async function claimRewards() {
      const claim = await contract?.call("claimRewards");
    }
  
    if (isLoading) {
      return <div>Loading</div>;
    }
  
    return (
      // <div className={styles.container}>
        
      //   <hr className={`${styles.divider} ${styles.spacerTop}`} />
  
      //   {!address ? (
      //     <>
      //     <h1 className="cow cow1">Connect Wallet</h1>
      //      <h1 className="yn">You need an Etherium wallet to use Ape Club</h1>
      //     <button className={styles.mainButton} onClick={connectWithMetamask}>
      //       Connect Wallet
      //     </button>
      //     </>
      //   ) : (
      //     <>
      //       <h1 className={styles.yb}>Your Balance</h1>
  
      //       <div className={styles.tokenGrid}>
             
      //         <div className={styles.tokenItem}>
      //           <h3 className={styles.tokenLabel}>Current Balance</h3>
      //           <p className={styles.tokenValue}>
      //             <b>{tokenBalance?.displayValue}</b> {tokenBalance?.symbol}
      //           </p>
      //         </div>
      //       </div>
  

  

      //     </>
      //   )}
      // </div>
      <section className="relativ mttt">
      <div className="container container--narrow pb-16">
        <div className="border-b-2 border-coal-light">
          <ul className="flex flex-col sm:flex-row flex-wrap -mb-2px font-hand text-lg md:text-xl lg:text-2xl text-gray-300 text-center">
            <li className="sm:w-1/3 border-t-2 sm:border-0 border-coal-light">
              <a href="/me/wallet/" className="block p-4 rounded-t-lg border-b-2 transition text-xenos-500 border-xenos-500">
                Overview
              </a>
            </li>
            <li className="sm:w-1/3 border-t-2 sm:border-0 border-coal-light">
              <a href="/me/wallet/activity" className="block p-4 rounded-t-lg border-b-2 transition border-transparent hover:text-white hover:border-gray-500">
                Wallet Activity
              </a>
            </li>
            <li className="sm:w-1/3 border-t-2 sm:border-0 border-coal-light">
              <a href="/me/wallet/earnings" className="block p-4 rounded-t-lg border-b-2 transition border-transparent hover:text-white hover:border-gray-500">
                Earnings Log
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-10">
          <div>
            <div className="flex flex-wrap -m-4 font-hand text-center">
              <div className="w-full sm:w-1/2 p-4">
                <div className="p-8 border-2 border-coal-light rounded-2xl bg-coal-dark">
                  <div className="text-xl font-semibold uppercase">
                    Wallet balance
                  </div>
                  <div className="inline-flex items-center mt-4">
                    <img src="https://gateway.pinata.cloud/ipfs/QmVgAZjazqRrETC4LFhA3t4sZt6VyesVisEqCvgRmd4gHZ" width={50} height={50} className="mr-6" />
                    <span className="text-5xl">
                      0.00
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2 p-4">
                <div className="p-8 border-2 border-coal-light rounded-2xl bg-coal-dark">
                  <div className="text-xl font-semibold uppercase">
                    Current earnings
                  </div>
                  <div className="inline-flex items-center mt-4">
                    <img src="https://gateway.pinata.cloud/ipfs/QmVgAZjazqRrETC4LFhA3t4sZt6VyesVisEqCvgRmd4gHZ" width={50} height={50} className="mr-6" />
                    <span className="text-5xl">
                      0.00
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 p-8 border-2 border-coal-light rounded-2xl bg-coal-dark">
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between -m-4 text-center sm:text-left">
                <div className="w-full sm:w-auto text-lg p-4">
                  You are not currently eligible to earn coins!
                </div>
                <div className="w-full sm:w-auto p-4">
                  <a href="http://lilbabyapeclub.com/learn" className="af-button--xenos whitespace-nowrap af-button ">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
  };
  
  export default Stake;