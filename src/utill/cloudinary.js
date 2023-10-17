const UPLOAD_PRESET = "ajrvbmhm";
const CLOUD_NAME = "dn0k00icq";
const API_KEY = "519859828187112";
export async function uploadToCloudinary(fileData) {
  const formData = new FormData();
  formData.append("file", fileData);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("cloud_name", CLOUD_NAME);
  formData.append("api_key", API_KEY);

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/c-296dea4aab04db01c63165ab95f61d/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await response.json();
  console.log({ data });
}
