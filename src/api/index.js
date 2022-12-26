import axios from "axios";
const axiosService = axios.create({
  baseURL: "http://localhost:8080/",
});
const axiosKakaoService = axios.create({
  baseURL: "https://kauth.kakao.com/",
});
const axiosKapiService = axios.create({
  baseURL: "https://kapi.kakao.com",
});
function doSocialLogin(code) {
  const url = `auth/login`;
  return axiosService.get(url, {params: {code: code}});
}

function doLogout() {
  const url = ``;
  return axiosKapiService.get(url);
}

function loginUser(userData) {
  const url = `act/login`;
  return axiosService.post(url, userData);
}

export {doSocialLogin, doLogout, loginUser};
