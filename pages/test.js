import React from "react";

import Link from "next/link";

import styles from "../styles/Home.module.css";

export default function Swaping() {
  return (
    <div>
      <Link href="/listings">
        <div className={styles.dflex}>
          <button>Back to Homepage</button>
        </div>
      </Link>
      <iframe
        id="iframe"
        src="https://app.uniswap.org/#/swap?outputCurrency=0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359&theme=dark"
        height="660px"
        width="100%"
        className={styles.ciframe}
        style={{
          border: 0,
          margin: "0 auto",
          display: "block",
          borderRadius: "10px",
          maxWidth: "600px",
          minWidth: "300px",
          background: "black",
        }}
      ></iframe>
    </div>
  );
}
