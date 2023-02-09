import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
// import Image from 'next/image'
// import HappyTigerFour from "../../public/icons/HappyTigerFour.png"
// import HappyOctopusFour from "../../public/icons/HappyOctopusFour.png"

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      {/* Top Section */}
      <h1 className={styles.h1 + " " + styles.nana}>Nana Market NFT - Mint Or Stake Your NFT</h1>
      <div className={styles.nftBoxGrid}>
        {/* <div
          className={styles.optionSelectBox}
          role="button"
          onClick={() => router.push(`/mint`)}
        >
          
          <img src="https://i.seadn.io/gcs/files/5d6eb6c5190f7d681c615873998c3df5.png?auto=format&w=750" className={styles.mintImg} alt="drop" width={175} height={175} />
          <h2 className={styles.selectBoxTitle}>Mint an NFT</h2>
          <p className={styles.selectBoxDescription}>
            Claim Your Nana NFT Here
          </p>
        </div> */}

        <div
          className={styles.optionSelectBox}
          role="button"
          onClick={() => router.push(`/staked`)}
        >
          {/* Staking an NFT */}
          <img src="https://i.seadn.io/gcs/files/4d7e38de2a8cdb6fb473b2a1a873bd3b.png?auto=format&w=1000" className={styles.mintImg} alt="drop" width={175} height={175} />
          <h2 className={styles.selectBoxTitle}>Stake Your NFTs</h2>
          <p className={styles.selectBoxDescription}>
            Stake Your Nana NFT Here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
