import {instance} from "./index";

// profile
// 팔로잉 (POST /profiles/follow)
function followUser(followData) {
  const url = `/profiles/follow`;
  return instance.post(url, followData);
}

// 언팔로잉 (DELETE /profiles/follow)
function unfollowUser(id) {
  const url = `/profiles/${id}/follow`;
  return instance.delete(url);
}

// 프로필 조회 (GET /profiles/{userId})
function getProfile(userId) {
  const url = `/profiles/${userId}`;
  return instance.get(url);
}

export {followUser, unfollowUser, getProfile};
