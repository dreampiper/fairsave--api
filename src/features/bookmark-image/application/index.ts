import { CeramicClient } from "@ceramicnetwork/http-client";
import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";
import crypto from "crypto";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { fromString } from "uint8arrays";
import { aliases } from "../../../utils/ceramic";

const bookmarkImage = async ({ cid, tag }: IBookmarkImage) => {
  let result: ISaveBookmarkResult;

  const tagHashSeed = crypto.createHash("sha256").update(tag).digest("hex");
  const subHash = tagHashSeed.substring(0, 32);

  try {
    const seed = fromString(Buffer.from(subHash).toString("hex"), "base16");

    // Create and authenticate the DID
    const did = new DID({
      provider: new Ed25519Provider(seed),
      resolver: getResolver(),
    });
    await did.authenticate();

    // Connect to the local Ceramic node
    const ceramic = new CeramicClient(process.env.CERAMIC_NODE_URL);
    ceramic.did = did;

    const model = new DataModel({ ceramic, aliases });
    const bookmarkStore = new DIDDataStore({ ceramic, model });

    const doc = (await bookmarkStore.get("fairsaveBookmark")) as IBookmarkStore;

    const bookmarks = [...doc.data];
    bookmarks.push({ imageCid: cid, createdAt: Date.now() });

    const data = { data: [...bookmarks] };

    await bookmarkStore.set("fairsaveBookmark", { ...data });

    result = { state: "successful", data: "Tag added to image" };
    return result;
  } catch (error) {
    console.error(error);
    result = { state: "failed", data: "An error occurred." };
    return result;
  }
};

export default bookmarkImage;
