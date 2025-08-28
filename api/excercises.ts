import axios from "axios";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const fetchApi = async (url: string, params: Record<string, any>) => {
  try {
    const options = {
      method: "GET",
      url,
      params,
      headers: {
        "x-rapidapi-key": `${process.env.EXPO_PUBLIC_RAPIDAPI_KEY}`,
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getBodyPartWorkouts = async (bodyPart: string) => {
  const data = await fetchApi(`${baseUrl}/exercises/bodyPart/${bodyPart}`, {});

  return data;
};

export const getWorkoutGIf = async (id: string, resolution: string) => {
  // According to docs, /image streams a GIF. Build a direct URL for use in <Image>.
  const apiKey = process.env.EXPO_PUBLIC_RAPIDAPI_KEY;
  if (!baseUrl || !apiKey) return "";

  // Ensure no trailing slash and remove accidental surrounding quotes
  const urlBase = String(baseUrl).replace(/^"|"$/g, "").replace(/\/+$/g, "");
  const url = `${urlBase}/image?exerciseId=${encodeURIComponent(
    id
  )}&resolution=${encodeURIComponent(resolution)}&rapidapi-key=${encodeURIComponent(
    apiKey as string
  )}`;
  return url;
};
