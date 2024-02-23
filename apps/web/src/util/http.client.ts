
import axios, { AxiosRequestConfig } from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

function httpClient<T>(
  path: string,
  config?: AxiosRequestConfig & { internal?: boolean }
): Promise<T> {
  const apiUrl = 'http://localhost:4000/' + path;

  return new Promise((res, rej) =>
    axios({ url: apiUrl, ...config })
      .then((result) => res(result.data))
      .catch((error) => rej(error))
  );
}

export default httpClient;