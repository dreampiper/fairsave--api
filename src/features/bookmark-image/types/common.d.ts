interface IBookmarkImage {
  cid: string;
  title: string;
  tag: string;
}
interface IGetBookmarks {
  tag: string;
}

interface ISaveBookmarkResult {
  state: "successful" | "failed";
  data: any;
}
