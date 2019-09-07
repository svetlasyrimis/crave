import { api } from './auth'

export const createComment = async (commentsData) => {
  const resp = await api.post('/comments', commentsData);
  return resp.data.comment;
};

export const fetchComments = async () => {
  const resp = await api.get('/')
  return resp.data.comment;
}

export const updateComment = async (id, comment) => {
  const resp = await api.put(`/comments/${id}`, { comment });
  return resp.data.comment;
};

export const deleteComment = async (id) => {
  const resp = await api.delete(`/comments/${id}`);
  return resp.data.comment
}
