import {instance} from "./index";

// tag
// 태그 목록 조회 (GET /tags)
function getTags() {
  const url = `/tags`;
  return instance.get(url);
}

export {getTags};
