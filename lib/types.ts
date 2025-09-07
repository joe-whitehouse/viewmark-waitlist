export interface EmailSubmission {
  email: string;
}

export interface EmailResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

export interface FormState {
  email: string;
  emailError: string;
  isLoading: boolean;
  showSuccess: boolean;
  isResetting: boolean;
  isFadingOut: boolean;
  isAlreadyExists: boolean;
}
