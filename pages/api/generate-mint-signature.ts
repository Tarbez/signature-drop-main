import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function generateMintSignature(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
   // De-construct body from request
   const { address } = JSON.parse(req.body);

   // Create a new instance of the ThirdwebSDK
   const sdk = ThirdwebSDK.fromPrivateKey(
     process.env.PRIVATE_KEY as string,
     "mumbai"
   );
    // Get the contract instance using useContract hook
    const { contract } = useContract("0x34EE45b17Bc7821D26eF4F7656bF344bBF152D8C");

    // Generate the signature
    const payload = {
      to: address,
      royaltyRecipient: "0x123456789abcdef",
      royaltyBps: "1000",
      primarySaleRecipient: "0x123456789abcdef",
      uri: "https://www.jsonkeeper.com/b/B77U",
      quantity: "1",
      pricePerToken: "1000000000000000000",
      currency: "0x123456789abcdef",
      validityStartTimestamp: "1640000000",
      validityEndTimestamp: "1650000000",
      uid: "123456789"
    };

    // Invoke the mintWithSignature function using useContractWrite hook
    const { mutateAsync: mintWithSignature, isLoading } = useContractWrite(contract, "mintWithSignature");
    const result = await mintWithSignature({ args: [JSON.stringify(payload), signature] });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid JSON input" });
  }
}
