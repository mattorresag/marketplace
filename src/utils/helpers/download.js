import { toast } from "react-toastify";
import FileSaver from "file-saver";
import { api } from "../../http/axios/auth";

const defaultDownloader = (data, filename) =>
  FileSaver.saveAs(data, filename || `export-${new Date().getTime()}.txt`);

export function download(route, params, options = {}) {
  const {
    callback,
    filename,
    fileExtension,
    responseType,
    forceDefaultDownloaded,
  } = options;
  toast.info("O download deve começar em instantes.");
  api
    .get(route, {
      params: {
        listAll: true,
        ...params,
      },
      responseType,
    })
    .then((result) => {
      let { data } = result;
      if (callback && typeof callback === "function") {
        data = callback(data);
      }
      const fileSaver = defaultDownloader;
      fileSaver(
        data,
        `${filename || `export-${new Date().getTime()}`}.${
          fileExtension || "txt"
        }`
      );
    })
    .catch((error) => {
      if (!error?.response?.data) return toast.error(error?.message);
      const reader = new FileReader();
      reader.onload = () => {
        const result = JSON.parse(reader.result);
        toast.error(result?.error || result?.message || error?.message);
      };
      reader.onerror = () => {
        toast.error(error?.message);
      };
      reader.readAsText(error?.response?.data);
    });
}
