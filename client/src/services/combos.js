import { api } from './auth';


export const getALL = async (id) => {
  const resp = await api.get(`combos/${id}/all`);
  return resp.data.combos
}
export const createCombo = async (comboData) => {
  const resp = await api.post(`/combos`, { ...comboData });
  return resp.data.combo;
};

export const deleteCombo = async (id) => {
  const resp = await api.delete(`/combos/${id}`);
  return resp.data

}

export const fetchUserCombos = async (id) => {
  const resp = await api.get(`/users/${id}/combos`);
  const filtered = resp.data.combos.filter(el => !el.isLiked) 
  return filtered;

};
export const getOneCombo = async (id) => {
  const resp = await api.get(`/combos/${id}`);
  return resp.data
}

export const fetchFavorites = async (id) => {
  const resp = await api.get(`/users/${id}/favorites`); 
  return resp.data.combos
}

// export const getAllCombos = async () => {
//   const resp = await api.get(`combos/all`);
//   return resp.data.combos
// }

