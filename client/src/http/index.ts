import axios, {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { CONSTANTS } from "../constants";
import { useLoading } from "@/stores/loading";
import { useToast } from "vue-toastification";
import Cookies from "js-cookie";

const user = { id: Cookies.get("userId") as string };

const toast = useToast();

export const authInstance = axios.create({
  baseURL: String(CONSTANTS.AUTH_URL),
});

export const userInstance = axios.create({
  baseURL: String(CONSTANTS.USER_URL),
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

export const dashboardInstance = axios.create({
  baseURL: String(CONSTANTS.DASHBOARD_URL + user.id),
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

export const tasksInstance = axios.create({
  baseURL: String(CONSTANTS.TASKS_URL + user.id),
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
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
    toast("Error while requesting to the server");
  },

  errorResponse: function (error: any) {
    const loading = useLoading();
    loading.setLoading(false);
    if (error.response) {
      toast(error.response?.data?.msg);
      if (error.response.status === 403) {
        Cookies.remove("token");
        Cookies.remove("user");
        Cookies.remove("userId");
        console.log(error);
      }
    }
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

dashboardInstance.interceptors.request.use(
  interceptor.request,
  interceptor.errorRequest
);

dashboardInstance.interceptors.response.use(
  interceptor.response,
  interceptor.errorResponse
);

tasksInstance.interceptors.request.use(
  interceptor.request,
  interceptor.errorRequest
);

tasksInstance.interceptors.response.use(
  interceptor.response,
  function (error: any) {
    const loading = useLoading();
    loading.setLoading(false);
    if (
      error.response.data.status !== "not found" &&
      !error.config.url.includes("/all/user-id")
    ) {
      toast(error.response.data.msg);
    } else {
      return;
    }
  }
);
