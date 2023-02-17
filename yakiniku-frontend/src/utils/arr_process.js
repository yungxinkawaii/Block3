export const makeIndexArr = async (addr) => {
  let retIdx = [];
  let accLength = 0;
  for (let i = 0; i < addr.length; i++) {
    accLength += addr[i].length;
    retIdx.push(accLength);
  }
  return retIdx;
};
