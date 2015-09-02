let uid = null;
export default {
  getUid: () => {
    return uid;
  },
  setUid: newId => {
    uid = newId;
  }
};