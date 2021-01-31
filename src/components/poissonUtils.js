export const generatePoissoinV1 = (parameter) => {
  let i = 0,
    p = 1;
  do {
    const u = Math.random();
    i += 1;
    p *= u;
  } while (p >= Math.exp(0 - parameter));
  const x = i - 1;
  return x;
};

export const generatePoissoinV2 = (parameter) => {
  const p = 0.0001;
  const n = (parameter / p).toFixed();
  const x = generateBinomial(n, p);
  return x;
};

const generateBinomial = (n, p) => {
  let x = 0;
  for (let i = 0; i < n; i++) {
    if (Math.random() < p) {
      x += 1;
    }
  }
  return x;
};
