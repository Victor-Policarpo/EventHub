export const usePasswordValidation = (password: string) => {
  const hasMinMax: boolean = password.length >= 8 && password.length <= 16;
  const hasLetter: boolean = /[a-zA-Z]/.test(password);
  const hasNumber: boolean = /\d/.test(password);
  const hasSpecial: boolean = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return {
    hasMinMax,
    hasLetter,
    hasNumber,
    hasSpecial,
    isAllValid: hasMinMax && hasLetter && hasNumber && hasSpecial
  };
};