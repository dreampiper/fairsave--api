interface IBookmarkImage {
  cid: string;
  tag: string;
}

interface ISaveBookmarkResult {
  state: "successful" | "failed";
  data: any;
}
