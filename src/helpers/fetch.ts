const baseUrl = import.meta.env.VITE_APP_API_URL;

export interface IFetchSinToken {
  endpoint: string;
  data: object;
  method: string;
}

export const fetchSinToken = ({
  endpoint = "",
  data,
  method = "GET",
}: IFetchSinToken) => {
  const url = `${baseUrl}/${endpoint}`;

  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};
