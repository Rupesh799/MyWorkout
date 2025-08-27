import axios from "axios";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;
console.log(baseUrl);

console.log(process.env.EXPO_PUBLIC_RAPIDAPI_KEY);

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
