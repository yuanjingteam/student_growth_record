// import OSS, { type SetOptions } from "ali-oss";

// class OSSUploader {
//   private client: OSS;

//   constructor() {
//     this.client = new OSS({
//       // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
//       region: "yourregion",
//       // 从环境变量中获取访问凭证
//       // 当然，以下两个也可以直接写死
//       accessKeyId: process.env.OSS_ACCESS_KEY_ID || "",
//       accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || "",
//       bucket: "examplebucket"
//     });
//   }

//   async uploadFile(file: File, options?: SetOptions): Promise<void> {
//     try {
//       await this.client.put(file.name, file, options);
//       console.log("File uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       throw error;
//     }
//   }
// }

// export default OSSUploader;
