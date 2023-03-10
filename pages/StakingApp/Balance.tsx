import React from 'react'

import {
    useAddress,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";


const Balance: NextPage = () => {
    const address = useAddress();


    const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
    const { contract } = useContract("0xe2c5fcf777a2b860921116b275951a50e8135eeb");

    useEffect(() => {
        if (!contract || !address) return;

        async function getbalance_() {
            const cr = await contract?.call("getRewardTokenBalance", address);
            console.log("Loaded claimable rewards", cr);
            setClaimableRewards(cr);
        }

        getbalance_();
    }, [address, contract]);


    console.log();
    return (
        <div>
            {!claimableRewards
                ? "Loading..."
                : ethers.utils.formatUnits(claimableRewards, 9)

            }

        </div>
    )
}

export default Balance;