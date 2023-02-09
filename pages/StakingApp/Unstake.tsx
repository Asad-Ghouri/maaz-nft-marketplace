import React from "react";
import {
    ThirdwebNftMedia,
    useOwnedNFTs,
} from "@thirdweb-dev/react";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useContract, useContractRead } from "@thirdweb-dev/react";

import styles from "../../styles/staking.module.css";

const Unstake: NextPage = () => {

    const address = useAddress();

    const nftDropContractAddress = "0x68225df7c4df4d82ded8478daa74c2138da1f85b";
    const stakingContractAddress = "0x8Df500F5678e2caa2639DBfBD8fA0BA0F9aBcC4d";


    const { contract: nftDropContract } = useContract(
        nftDropContractAddress,
        "nft-drop"
    );

    const { contract } = useContract(
        "0x272E4D319CD8d63d3FE882E091f11059c15183F3"
    );


    const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);


    // const { contract: stakeContract } = useContract(
    //     "0x272E4D319CD8d63d3FE882E091f11059c15183F3"
    // );


    async function stakeNft(id: string) {
        if (!address) return;


        const isApproved = await nftDropContract?.isApproved(
            address,
            stakingContractAddress
        );

        if (!isApproved) {
            await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
        }


        const stake = await contract?.call("stake", id, nftDropContractAddress);

    }

    return (
        <>
            <h2 className="uc">Stake Your Unstaked NFTs</h2>

            <div className={styles.nftBoxGrid}>
                {ownedNfts?.map((nft) => (
                    <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                        <ThirdwebNftMedia
                            metadata={nft.metadata}
                            className={styles.nftMedia}
                        />
                        <h3>{nft.metadata.name}</h3>
                        <button
                            className={`${styles.mainButton} ${styles.spacerTop}`}
                            onClick={() => stakeNft(nft.metadata.id)}
                        >
                            Stake
                        </button>
                    </div>
                ))}
            </div>

        </>
    );
};

export default Unstake;