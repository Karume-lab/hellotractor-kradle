export const messages = {
  PASSWORD_RESET: (resetPasswordLink: string) => `
    **Subject:** Reset Your Password  
    Hello,  
    We received a request to reset your password. If you made this request, please click the link below to reset your password:  
    ** [Reset Password]${resetPasswordLink} **  
    This link will expire in one hour. If you did not request a password reset, no action is required. Your account is safe.  

    If you have any questions, please contact our support team.  
    Best regards,  
    Hello Tractor
`,
};
