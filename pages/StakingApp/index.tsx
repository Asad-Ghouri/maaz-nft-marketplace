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
import { ConnectWallet, useSDK } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import styles from "../../styles/staking.module.css";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import Link from "next/link";
// import BackIcon from "../public/icons/BackIcon.png";
import Image from "next/image";

import Unstake from "./Unstake"

import Balance from "./Balance";

const nftDropContractAddress = "0x68225df7c4df4d82ded8478daa74c2138da1f85b";

const stakingContractAddress = "0x272E4D319CD8d63d3FE882E091f11059c15183F3";


const Stake: NextPage = () => {

  const [selectval, setselectval] = useState<string>("0x68225df7c4df4d82ded8478daa74c2138da1f85b");

  const connectWithMetamask = useMetamask();
  const address = useAddress();


  // Contract Hooks
  const { contract: nftDropContract } = useContract(
    nftDropContractAddress,
    "nft-drop"
  );


  const { contract, isLoading } = useContract(stakingContractAddress);

  // Load Unstaked NFTs
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);

  const [stakedNfts, setStakedNfts] = useState<any>([]);


  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();



  // ----- for aunstronaut ------

  useEffect(() => {
    if (!contract) return;



    async function loadStakedNfts() {
      const stakedTokens = await contract?.call("getStakedTokens", address);

      // For each staked token, fetch it from the sdk
      // setbg(new BigNumber(0));
      const stakedNfts = await Promise.all(
        stakedTokens?.map(
          async (stakedToken: { staker: string; tokenId: BigNumber }) => {
            const as = stakedToken.tokenId.toNumber();
            if (as != 0) {
              const nft = await nftDropContract?.get(stakedToken.tokenId);
              return nft;
            }
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
      const cr = await contract?.call("claimRewards", address);
      console.log("Loaded claimable rewards", cr);
      setClaimableRewards(cr);
    }

    loadClaimableRewards();
  }, [address, contract]);


  async function withdraw(id: BigNumber) {
    const withdraw = await contract?.call("withdraw", id, selectval);
  }

  async function claimRewards() {
    const claim = await contract?.call("claimRewards");
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      {/* <Link href="/">
        <div className="d-flex">
          <Image src={BackIcon} className="asad" width={50} height={50} />

          <h3>Go To Dashboard</h3>
        </div>
      </Link> */}
      <div
        className={
          !address
            ? styles.container +
            " " +
            styles.stakecontainer +
            " " +
            styles.stakeco
            : styles.container + styles.stakecontainer
        }
      >

        <hr className={`${styles.divider} ${styles.spacerTop}`} />

        {!address ? (
          <button
            className={styles.mainButton}
            id="autom"
            onClick={connectWithMetamask}
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <h2>WALLET BALANCE</h2>

            <div className={styles.tokenGrid}>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Claimable Rewards</h3>
                <p className={styles.tokenValue}>
                  <b>
                    {!claimableRewards
                      ? "Loading..."
                      : ethers.utils.formatUnits(claimableRewards, 18)}
                  </b>{" "}
                  {/* {tokenBalance?.symbol} */}
                </p>
              </div>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Your Shera Balance</h3>
                <p className={styles.tokenValue}>
                  <b>
                    <Balance />
                  </b>
                </p>
              </div>
            </div>

            <button
              className={`${styles.mainButton} ${styles.spacerTop}`}
              onClick={() => claimRewards()}
            >
              Claim Rewards
            </button>

            <hr className={`${styles.divider} ${styles.spacerTop}`} />

            <h2 className="uc">Your Staked NFTs</h2>




            <div className={styles.nftBoxGrid + " " + styles.imgcenter}>
              {stakedNfts?.map((nft) => (
                <div className="console log" key="12">
                  {nft ? (
                    <div
                      className={styles.nftBox}
                      key={nft.metadata.id.toString()}
                    >
                      {console.log("token id is " + nft.metadata.id)}

                      <h3>{nft.metadata.name}</h3>
                      <ThirdwebNftMedia
                        metadata={nft.metadata}
                        className={styles.nftMedia}
                      />

                      <button
                        className={`${styles.mainButton} ${styles.spacerBottom} ${styles.wi}`}
                        onClick={() => withdraw(nft.metadata.id)}
                      >
                        Withdraw
                      </button>
                      <div key="1"></div>

                    </div>
                  ) : (
                    <div key="1"></div>
                  )}
                </div>
              ))}
            </div>



            <hr className={`${styles.divider} ${styles.spacerTop}`} />

            <Unstake />

          </>
        )}
      </div>

    </>
  );
};

export default Stake;
