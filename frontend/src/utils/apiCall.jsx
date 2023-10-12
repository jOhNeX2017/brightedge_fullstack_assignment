import axios from "axios";

export const STATUS_OK = 200;
export const DEFAULT_ERROR_MESSAGE =
  "We're sorry, our platform is currently unavailable.\
                We are working to restore it so please try again soon.\
                We apologize for any inconvenience.";

export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const handleErrors = (err = DEFAULT_ERROR_MESSAGE) => {
  // Have to handle all kinds of errors differently. For now:
  return Promise.reject(err);
};

export const postApiCall = (url, req = {}) => {
  return axios
    .post(url, req, config)
    .then((res) => {
      if (res.data) {
        return res.data;
      }

      const messageText =
        res.data && (res.data.msgText || res.data.messageText);
      return handleErrors(new Error(messageText));
    })
    .catch(handleErrors);
};

export const getApiCall = (url) => {
  return axios
    .get(url, config)
    .then((res) => {
      if (res.data) {
        return res.data;
      }

      const messageText =
        res.data && (res.data.msgText || res.data.messageText);
      return handleErrors(new Error(messageText));
    })
    .catch(handleErrors);
};

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function captalizeValues(val) {
  const arr = val.split("_");
  let string = "";
  for (let i = 0; i < arr.length; i++) {
    string += toTitleCase(arr[i]) + " ";
  }
  return string;
}
