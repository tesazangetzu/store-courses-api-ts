import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandOutput,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_ACCESS!,
  },
});

interface ImageUploadResponse {
  status: boolean;
  url: string;
}

interface Params {
  Bucket: string;
  Key: string;
  Body: Buffer;
  ACL: string;
}

export const imgUpload = async (
  file: Express.Multer.File
): Promise<ImageUploadResponse> => {
  const imgKey = `images/${Date.now()}_${file.originalname}`;
  const params: Params = {
    Bucket: process.env.S3_BUCKET!,
    Key: imgKey,
    Body: file.buffer,
    ACL: "public-read",
  };
  const command = new PutObjectCommand(params);

  try {
    const response: PutObjectCommandOutput = await s3.send(command);
    if (response.$metadata.httpStatusCode !== 200)
      throw new Error("Error upload S3");

    return { status: true, url: `${process.env.S3_URL_BASE}/${imgKey}` };
  } catch (error) {
    console.error("Error upload image:", error);
    return { status: false, url: "" };
  }
};
