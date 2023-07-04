import axios from "axios";
import config from "../config";
import { useLoading } from "@/stores/loading";
import { useToast } from "vue-toastification";

const toast = useToast();

export const globalInstance = axios.create({
  baseURL: config.SERVER_BASE,
});

export const authInstance = axios.create({
  baseURL: config.AUTH_URL,
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
    toast("Error while requesting to the server", { type: "error" });
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
    toast("Error while requesting to the server", { type: "error" });
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
    toast("Error while requesting to the server", { type: "error" });
  }
);
