export const generateN01 = () => {
  // Generam o variabila aleatoare N(0, 1)
  let sum = 0.0;
  let X = 0;
  for (var i = 0; i < 12; i += 1) {
    let r = Math.random();
    sum += r;
  }
  X = sum - 6;
  return X;
};

export const centralLimit = (mu, sigma) => {
  // Calculam N(0, 1)
  let Z = generateN01();
  // Calculam N(mu, sigma)
  let X = mu + Math.sqrt(sigma) * Z;
  return X;
};
