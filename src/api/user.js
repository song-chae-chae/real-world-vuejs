import {instance} from "./index";

// user
// 로그인 (POST /users/login)
function loginUser(code) {
  const url = `/users/login`;
  return instance.post(url, {code: code});
}
// 회원 정보 (GET /user)
function getUser() {
  const url = "/user";
  return instance.get(url);
}

// 회원 수정 (PUT /user)
function updateUser(updateUserData) {
  const url = "/user";
  return instance.put(url, updateUserData);
}

export {loginUser, getUser, updateUser};
