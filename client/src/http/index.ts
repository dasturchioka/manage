import axios from "axios";
import { CONSTANTS } from "../constants";
import { useLoading } from "@/stores/loading";
import { useToast } from "vue-toastification";

const toast = useToast();

export const globalInstance = axios.create({
  baseURL: CONSTANTS.SERVER_BASE,
});

export const authInstance = axios.create({
  baseURL: CONSTANTS.AUTH_URL,
});

globalInstance.interceptors.request.use(
  function (config) {
    const loading = useLoading();
    loading.setLoading(true);
    return config;
  },
  function (error) {
    const loading = useLoading();
    loading.setLoading(false);
    console.log(error);
    toast("Error while requesting to the server", { type: "error" });
  }
);

globalInstance.interceptors.response.use(
  function (config) {
    const loading = useLoading();
    loading.setLoading(false);
    return config;
  },
  function (error) {
    const loading = useLoading();
    loading.setLoading(false);
    console.log(error);
    toast(error.response.data.msg, { type: "error" });
  }
);

authInstance.interceptors.request.use(
  function (config) {
    const loading = useLoading();
    loading.setLoading(true);
    return config;
  },
  function (error) {
    const loading = useLoading();
    loading.setLoading(false);
    console.log(error);
    toast('Error while requesting the data', { type: "error" });
  }
);

authInstance.interceptors.response.use(
  function (config) {
    const loading = useLoading();
    loading.setLoading(false);
    return config;
  },
  function (error) {
    const loading = useLoading();
    loading.setLoading(false);
    console.log(error);
    toast(error.response.data.msg, { type: "error" });
  }
);
