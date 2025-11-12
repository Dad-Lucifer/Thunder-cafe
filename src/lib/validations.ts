// Form validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[\d\s\-()]+$/;
  return phoneRegex.test(phone);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateForm = (formData: any): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!validateRequired(formData.fullName)) {
    errors.fullName = 'Full name is required';
  }

  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!validateRequired(formData.gameSlug)) {
    errors.gameSlug = 'Please select a game';
  }

  if (!validateRequired(formData.timeSlot)) {
    errors.timeSlot = 'Please select a time slot';
  }

  if (!formData.duration) {
    errors.duration = 'Please select a duration';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};