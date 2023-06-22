const validateEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
}

export default validateEmail