import axios, {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { CONSTANTS } from "../constants";
import { useLoading } from "@/stores/loading";
import { useToast } from "vue-toastification";
import Cookies from "js-cookie";

const toast = useToast();

export const authInstance = axios.create({
  baseURL: String(CONSTANTS.AUTH_URL),
});

export const userInstance = axios.create({
  baseURL: String(CONSTANTS.USER_URL),
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`
  }
});

const interceptor = {
  request: function (config: InternalAxiosRequestConfig) {
    const loading = useLoading();
    loading.setLoading(true);
    return config;
  },

  response: function (config: AxiosResponse) {
    const loading = useLoading();
    loading.setLoading(false);
    return config;
  },

  errorRequest: function (error: any) {
    const loading = useLoading();
    loading.setLoading(false);
    console.log(error);
    toast("Error while requesting to the server", { type: "error" });
  },

  errorResponse: function (error: any) {
    const loading = useLoading();
    loading.setLoading(false);
    console.log(error);
    toast(error.response.data.msg, { type: "error" });
  },
};

userInstance.interceptors.request.use(
  interceptor.request,
  interceptor.errorRequest
);

userInstance.interceptors.response.use(
  interceptor.response,
  interceptor.errorResponse
);

authInstance.interceptors.request.use(
  interceptor.request,
  interceptor.errorRequest
);

authInstance.interceptors.response.use(
  interceptor.response,
  interceptor.errorResponse
);