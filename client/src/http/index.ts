import axios from "axios";
import config from "../config";
import { useLoading } from "@/stores/loading";
import { useToast } from "vue-toastification";

const loading = useLoading();
const toast = useToast();

axios.interceptors.request.use(
  function (config) {
    loading.setLoading(true);
    return config;
  },
  function (error) {
    loading.setLoading(false);
    console.log(error);
    toast("Error while requesting to the server", {});
  }
);

export const authInstance = axios.create({
  baseURL: config.AUTH_URL,
});
