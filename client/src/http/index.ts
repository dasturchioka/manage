import axios, {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { CONSTANTS } from "../constants";
import { useLoading } from "@/stores/loading";
import { useToast } from "vue-toastification";

const toast = useToast();

export const authInstance = axios.create({
  baseURL: CONSTANTS.AUTH_URL,
});

export const userInstance = axios.create({
  baseURL: CONSTANTS.SERVER_BASE,
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

globalInstance.interceptors.request.use(
  interceptor.request,
  interceptor.errorRequest
);

globalInstance.interceptors.response.use(
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
