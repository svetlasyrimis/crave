import { api } from './auth';


export const getALL = async (id) => {
  const resp = await api.get(`combos/${id}/all`);
  console.log(resp.data)
  return resp.data
}
export const createCombo = async (comboData) => {
  
  const resp = await api.post(`/combos`, {...comboData});
  console.log(resp.data.combo)
  return resp.data.combo;
};

export const deleteCombo = async (id) => {
  const resp = await api.delete(`/combos/${id}`);
  return resp.data

}

export const fetchUserCombos = async (id) => {
  const resp = await api.get(`/users/${id}/combos`);
  console.log(resp.data.combos)
  const filtered = resp.data.combos.filter(el => !el.isLiked)
  console.log(filtered)
  return filtered;
 
};
export const getOneCombo = async(id)  => {
  const resp = await api.get(`/combos/${id}`);
  return resp.data
}

export const fetchFavorites = async (id) => {
  const resp = await api.get(`/users/${id}/favorites`); 
  console.log(resp)
  return resp.data.combos
}

