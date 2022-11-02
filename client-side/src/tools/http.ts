import { notification } from "antd";
import axios from "axios";
import qs from "qs";

const http = axios.create({
  paramsSerializer: {
    encode: (params) => {
      const { __notification, ...rest } = params;
      return qs.stringify(rest);
    },
  },
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    notification.error({
      message: error.message,
      description: error.message,
    });

    return Promise.reject(error);
  }
);

export default http;
