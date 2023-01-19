import {instance} from "./index";

// article
// 아티클 작성 (POST /articles)
function createArticle(createArticleData) {
  const url = `/articles`;
  return instance.post(url, createArticleData);
}

// 아티클 수정 (PUT /articles/{articleId})
function updateArticle(articleId, updateArticleData) {
  const url = `/articles/${articleId}`;
  return instance.put(url, updateArticleData);
}

// 아티클 삭제 (DELETE /articles/{articleId})
function deleteArticle(articleId) {
  const url = `/articles/${articleId}`;
  return instance.delete(url);
}

// 아티클 목록 조회 (GET /articles)
function getArticles(articleSearchData) {
  const url = `/articles`;
  return instance.get(url, {params: articleSearchData});
}

// 아티클 단건 조회 (GET /articles/{articleId})
function getArticle(articleId) {
  const url = `/articles/${articleId}`;
  return instance.get(url);
}

// 내 피드 조회
function getFeed(articleSearchData) {
  const url = `/articles/feed`;
  return instance.get(url, {params: articleSearchData});
}

// 댓글 조회
function getComments(articleId) {
  const url = `/articles/${articleId}/comments`;
  return instance.get(url);
}

// 댓글 작성 (POST /articles/{articleId}/comment)
function createComment(articleId, commentCreateData) {
  const url = `/articles/${articleId}/comment`;
  return instance.post(url, commentCreateData);
}

// 댓글 삭제 (DELETE /articles/{articleId}/comment/{commentId})
function deleteComment(articleId, commentId) {
  const url = `/articles/${articleId}/comment/${commentId}`;
  return instance.delete(url);
}

// 댓글 수정 (PATCH /articles/{articleId}/comment/{commentId})
function updateComment(articleId, commentId, commentUpdateData) {
  const url = `/articles/${articleId}/comment/${commentId}`;
  return instance.patch(url, commentUpdateData);
}

// 좋아요 (POST /articles/{articleId}/favorite)
function createFavorite(articleId) {
  const url = `/articles/${articleId}/favorite`;
  return instance.post(url);
}

// 좋아요 취소 (DELETE /articles/{articleId}/favorite)
function deleteFavorite(articleId) {
  const url = `/articles/${articleId}/favorite`;
  return instance.delete(url);
}

export {
  createArticle,
  updateArticle,
  deleteArticle,
  getArticles,
  getArticle,
  getFeed,
  getComments,
  createComment,
  deleteComment,
  updateComment,
  createFavorite,
  deleteFavorite,
};
