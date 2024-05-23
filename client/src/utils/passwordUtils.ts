export const getPasswordFeedback = (password: string) => {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const feedback = { strength: '', message: '' };

  if (score < 2) {
    feedback.strength = 'Weak';
    feedback.message =
      'Add more characters, mix upper and lower case letters, and include numbers or symbols.';
  } else if (score < 4) {
    feedback.strength = 'Moderate';
    feedback.message =
      'Good start, but consider adding more unique characters and numbers.';
  } else {
    feedback.strength = 'Strong';
    feedback.message = 'Great job! Your password is strong.';
  }

  console.log('Calculated Feedback:', feedback);
  return feedback;
};
