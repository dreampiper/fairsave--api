import { Request, Response } from "express";
import fs from "fs";
import { getFilesFromPath, Web3Storage } from "web3.storage";
import { errors, results } from "../../utils/enums.js";
import responseHandler from "../../utils/response-handler.js";

import path from "path";

export default async (req: Request, res: Response) => {
  const multerReq = req as any;
  let result;

  if (!multerReq.file) {
    result = {
      state: results.failed,
      data: { status: false, msg: "no file provided" },
    };
  } else {
    const fileName = multerReq.file.filename;

    console.log(fileName);

    const storage = new Web3Storage({
      token: process.env.WEB3_TOKEN || "",
    });

    const pathFiles = await getFilesFromPath(
      path.join(`./uploads/${fileName}`)
    );

    const cid = await storage.put(pathFiles, { wrapWithDirectory: false });
    console.log("Content added with CID:", cid);

    fs.unlinkSync(`./uploads/${fileName}`);

    result = {
      state: results.success,
      data: {
        status: true,
        msg: { cid, title: fileName },
        // msg: `Content added with CID ${cid} for file ${fileName}`,
      },
    };
  }

  switch (result.state) {
    case results.success:
      responseHandler({ res, status: 200, data: result.data });
      break;

    case results.failed:
      responseHandler({ res, status: 400, data: errors.generic });
      break;

    default:
      responseHandler({ res, status: 400, data: errors.generic });
      break;
  }
};
