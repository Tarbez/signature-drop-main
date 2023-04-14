import {
  useAddress,
  useContract,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import { SignedPayload721WithQuantitySignature } from "@thirdweb-dev/sdk";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { useState } from "react";
export const contractAddress = "0xb5201E87b17527722A641Ac64097Ece34B21d10A";
const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { contract } = useContract(
    "0x34EE45b17Bc7821D26eF4F7656bF344bBF152D8C"
  );
  const { mutateAsync: mintWithSignature } = useContractWrite(
    contract,
    "mintWithSignature"
  );
  const address = useAddress();
  const handleClaimWithSignature = async () => {
    setIsLoading(true);
    try {
      const body = JSON.stringify({ address: address });
      console.log(body); // log the request body
      const req = await fetch("/api/generate-mint-signature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      const res = await req.json();
      console.log(res);
    } catch (err) {}
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      {/* Top Section */}
      <h1 className={styles.h1}>Signature Drop</h1>

      <p className={styles.describe}>
        In this example, users who own one of our{" "}
        <a href="https://opensea.io/collection/thirdweb-community">
          Early Access NFTs
        </a>{" "}
        can mint for free using the{" "}
        <a href="https://portal.thirdweb.com/pre-built-contracts/signature-drop#signature-minting">
          Signature Mint
        </a>
        . However, for those who don&apos;t own an Early Access NFT, they can
        still claim using the regular claim function.
      </p>

      <div className={styles.nftBoxGrid}>
        <div className={styles.optionSelectBox}>
          <Image
            src="/icons/drop.webp"
            alt="drop"
            className={styles.cardImg}
            height={42}
            width={42}
          />
          <h2 className={styles.selectBoxTitle}>Claim NFT</h2>
          <p className={styles.selectBoxDescription}>
            Use the normal <code>claim</code> function to mint an NFT under the
            conditions of the claim phase.
          </p>

          {/*   <Web3Button contractAddress={contractAddress} theme="dark">
            Claim
          </Web3Button> */}
        </div>

        <div className={styles.optionSelectBox}>
          <Image
            width={42}
            height={42}
            src="/icons/analytics.png"
            alt="signature-mint"
            className={styles.cardImg}
          />
          <h2 className={styles.selectBoxTitle}>Mint with Signature</h2>
          <p className={styles.selectBoxDescription}>
            Check if you are eligible to mint an NFT for free, by using
            signature-based minting.
          </p>

          <Web3Button
            contractAddress={contractAddress}
            action={() => handleClaimWithSignature()}
            theme="dark"
          >
            Claim With Signature
          </Web3Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
