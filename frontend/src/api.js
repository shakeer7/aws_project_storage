import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getUploadUrl = async (fileName) => {

  const response = await axios.get(
    `${API_URL}/api/presigned-url?fileName=${fileName}`
  );

  return response.data.uploadUrl;
};
