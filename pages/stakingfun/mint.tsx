// import { Web3Button } from "@thirdweb-dev/react";
// import type { NextPage } from "next";
// import { useRouter } from "next/router";
// import styles from "../styles/Home.module.css";
// import Image from 'next/image'
// import Link from 'next/link'
// import BackIcon from "../public/icons/BackIcon.png"
export default function Mint() {
  // const router = useRouter();

  return (
    <>
      {/* <Link href="/">
        <div className="d-flex">
          <Image src={BackIcon} className="asad" width={50} height={50} />

          <h3>Go To Dashboard</h3>
        </div>
      </Link>
      <div className={styles.container + " " + styles.mintcontainer}>
        <h1 className={styles.h1}>Claim Your Shera NFT</h1>
        <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

        <Web3Button
          colorMode="dark"
          accentColor="#5204BF"
          contractAddress="0x97514C9924d3FE734C5AdB7Cbfa0F71ed8CAf374"
          action={(contract) => contract.erc721.claim(1)}
          onSuccess={() => {
            alert("NFT Claimed!");
            router.push(`/stake`);
          }}
          onError={(error) => {
            console.error(error);
            alert(error);
          }}
        >
          Claim An NFT
        </Web3Button> */}

      {/* <iframe src="https://gateway.ipfscdn.io/ipfs/Qmcine1gpZUbQ73nk7ZGCcjKBVFYXrEtqrhujXk3HDQ6Nn/erc721.html?contract=0x97514C9924d3FE734C5AdB7Cbfa0F71ed8CAf374&chainId=137&theme=dark&primaryColor=cyan" width="600px" height="600px" style={{ maxWidth: '100%',textTransform:"uppercase", borderRadius:"20px"}} frameBorder={0} /> */}

      {/* </div> */}
    </>
  );
};
