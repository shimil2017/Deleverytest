export const PICK_POINTS_ADD = 'PICK_POINTS_ADD';
export const PICK_POINTS_REMOVE = 'PICK_POINTS_REMOVE';
export const addPickup = (responseJson) => {
  return {
    type: PICK_POINTS_ADD,
    payload: responseJson,
  };
};

export const removePickup = () => {
  return {
    type: PICK_POINTS_REMOVE,

  };
};
