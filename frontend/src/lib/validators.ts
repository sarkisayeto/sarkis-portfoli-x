export interface ValidationError {
  field: string;
  message: string;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateContactForm = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Le nom est requis' });
  } else if (data.name.trim().length > 100) {
    errors.push({ field: 'name', message: 'Le nom ne peut pas dépasser 100 caractères' });
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.push({ field: 'email', message: "L'email est requis" });
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: "L'email n'est pas valide" });
  } else if (data.email.length > 255) {
    errors.push({ field: 'email', message: "L'email ne peut pas dépasser 255 caractères" });
  }

  if (!data.subject || data.subject.trim().length === 0) {
    errors.push({ field: 'subject', message: 'Le sujet est requis' });
  } else if (data.subject.trim().length > 200) {
    errors.push({ field: 'subject', message: 'Le sujet ne peut pas dépasser 200 caractères' });
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.push({ field: 'message', message: 'Le message est requis' });
  } else if (data.message.trim().length > 2000) {
    errors.push({ field: 'message', message: 'Le message ne peut pas dépasser 2000 caractères' });
  }

  return errors;
};

export const validateProjectForm = (data: {
  title: string;
  description: string;
  technologies: string[];
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push({ field: 'title', message: 'Le titre est requis' });
  } else if (data.title.trim().length > 200) {
    errors.push({ field: 'title', message: 'Le titre ne peut pas dépasser 200 caractères' });
  }

  if (!data.description || data.description.trim().length === 0) {
    errors.push({ field: 'description', message: 'La description est requise' });
  } else if (data.description.trim().length > 5000) {
    errors.push({ field: 'description', message: 'La description ne peut pas dépasser 5000 caractères' });
  }

  if (!data.technologies || data.technologies.length === 0) {
    errors.push({ field: 'technologies', message: 'Au moins une technologie est requise' });
  }

  return errors;
};
