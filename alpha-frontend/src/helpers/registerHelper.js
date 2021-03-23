const passwordValidator = (pass) => {
  const passwordCheck = /(?=.*[\d])(?=.*[`~!@#$%^&*.,?:\(\)\-_]).{6,}$/;
  return passwordCheck.test(pass);
};

export { passwordValidator };
