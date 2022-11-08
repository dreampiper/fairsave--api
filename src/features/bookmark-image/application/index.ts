import { CeramicClient } from "@ceramicnetwork/http-client";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { fromString } from "uint8arrays";

const bookmarkImage = async ({ cid, tag }: IBookmarkImage) => {
  let result: ISaveBookmarkResult;
  const tagDidHashSeed = tag;
  try {
    const seed = fromString(
      Buffer.from(tagDidHashSeed).toString("hex"),
      "base16"
    );

    // Create and authenticate the DID
    const did = new DID({
      provider: new Ed25519Provider(seed),
      resolver: getResolver(),
    });
    await did.authenticate();

    // Connect to the local Ceramic node
    const ceramic = new CeramicClient();
    ceramic.did = did;

    result = { state: "successful", data: "Tag added to image" };
    return result;
  } catch (error) {
    console.error(error);
    result = { state: "failed", data: "An error occurred." };
    return result;
  }
};

export default bookmarkImage;
