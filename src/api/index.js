import axios from "axios";
const axiosService = axios.create({
  baseURL: "http://localhost:8080/",
});

const axiosKakaoService = axios.create({
  baseURL: "https://kauth.kakao.com/",
});

function doSocialLogin(code) {
  const url = `auth/login`;
  return axiosService.get(url, {params: {code: code}});
}

export {doSocialLogin};
