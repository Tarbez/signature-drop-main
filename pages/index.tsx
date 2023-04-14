import {
  useAddress,
  useContract,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { useState } from "react";

const Home = () => {
  const address = useAddress();
  const { contract } = useContract(
    "0x34EE45b17Bc7821D26eF4F7656bF344bBF152D8C"
  );
  const [img, setImg] = useState(null);
  const { mutateAsync: mintWithSignature, isLoading } = useContractWrite(
    contract,
    "mintWithSignature"
  );

  const handleClaimWithSignature = async () => {
    try {
      const req = await fetch("/api/generate-mint-signature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          name: "Name NFT ",
          description: "NFT Description",
          image: "img",
        }),
      });
      const signedPayload = (await req.json()).signedPayload;

      // Use the mintWithSignature function returned from useContractWrite
      await mintWithSignature(signedPayload);
    } catch (err) {
      console.error(err);
    }
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
            contractAddress="0x34EE45b17Bc7821D26eF4F7656bF344bBF152D8C"
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
