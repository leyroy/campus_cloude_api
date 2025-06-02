import bcrypt from "bcryptjs";
import crypto from "crypto";
import { ErrorHandler } from "../middlewares/errorHandler";

export interface PasswordConfig {
  saltRounds?: number;
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
}

export class PasswordService {
  private static readonly DEFAULT_CONFIG: Required<PasswordConfig> = {
    saltRounds: 12,
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  };

  private config: Required<PasswordConfig>;

  constructor(config?: PasswordConfig) {
    this.config = { ...PasswordService.DEFAULT_CONFIG, ...config };
  }

  // Hash a plain text password using bcrypt
  async hashPassword(plainPassword: string): Promise<string> {
    try {
      // Validate password strength first
      this.validatePasswordStrength(plainPassword);

      // Hash with bcrypt
      const hashedPassword = await bcrypt.hash(plainPassword, this.config.saltRounds);
      console.log(plainPassword, hashedPassword);
      return hashedPassword;
    } catch (error) {
      if (error instanceof Error) {
        throw ErrorHandler.badRequest(
          `Password hashing failed: ${error.message}`
        );
      }
      throw ErrorHandler.internal("Password hashing failed");
    }
  }

  // Verify a plain text password against a hashed password
   verifyPassword(
    plainPassword: string,
    hashedPassword: string
  ) {
    try {
      if (!plainPassword || !hashedPassword) {
        console.log("Verifying password:", plainPassword, hashedPassword);
        return false;
      }
      const isMatch =  bcrypt.compareSync(plainPassword, hashedPassword);
      console.log("Password match result:", isMatch);
      return isMatch;
    } catch (error) {
      console.error("Password verification error:", error);
      return false;
    }
  }

  // Validate password strength based on configuration
  validatePasswordStrength(password: string): void {
    const errors: string[] = [];

    if (password.length < this.config.minLength) {
      errors.push(
        `Password must be at least ${this.config.minLength} characters long`
      );
    }

    if (this.config.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (this.config.requireLowercase && !/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    if (this.config.requireNumbers && !/\d/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    if (
      this.config.requireSpecialChars &&
      !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)
    ) {
      errors.push("Password must contain at least one special character");
    }

    if (errors.length > 0) {
      throw new Error(errors.join(", "));
    }
  }

  //Generate a password reset token
  generateResetToken(): {
    token: string;
    hashedToken: string;
    expiresAt: Date;
  } {
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    return { token, hashedToken, expiresAt };
  }

  // Hash a reset token for storage
  hashResetToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex");
  }

  // Check if password needs rehashing (if salt rounds changed)
  needsRehash(hashedPassword: string): boolean {
    try {
      const rounds = bcrypt.getRounds(hashedPassword);
      return rounds < this.config.saltRounds;
    } catch {
      return true; // If we can't determine rounds, rehash to be safe
    }
  }

  // Get password strength score (0-4)
  getPasswordStrength(password: string): { score: number; feedback: string[] } {
    let score = 0;
    const feedback: string[] = [];

    // Length check
    if (password.length >= 8) score++;
    else feedback.push("Use at least 8 characters");

    if (password.length >= 12) score++;
    else if (password.length >= 8)
      feedback.push("Longer passwords are more secure");

    // Character variety
    if (/[a-z]/.test(password)) score++;
    else feedback.push("Add lowercase letters");

    if (/[A-Z]/.test(password)) score++;
    else feedback.push("Add uppercase letters");

    if (/\d/.test(password)) score++;
    else feedback.push("Add numbers");

    if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) score++;
    else feedback.push("Add special characters");

    // Reduce score for common patterns
    if (/(.)\1{2,}/.test(password)) {
      score = Math.max(0, score - 1);
      feedback.push("Avoid repeated characters");
    }

    if (/123|abc|qwe/i.test(password)) {
      score = Math.max(0, score - 1);
      feedback.push("Avoid common sequences");
    }

    return {
      score: Math.min(4, score),
      feedback: feedback.slice(0, 3), // Limit feedback to top 3 issues
    };
  }
}

// // ===== USAGE EXAMPLES =====

// // Basic usage
// const passwordService = new PasswordService();

// // Custom configuration
// const strictPasswordService = new PasswordService({
//   saltRounds: 14,        // More secure but slower
//   minLength: 12,         // Longer minimum length
//   requireSpecialChars: true,
// });

// // Example usage in user registration
// export const registerUser = async (email: string, plainPassword: string) => {
//   try {
//     // Hash the password
//     const hashedPassword = await passwordService.hashPassword(plainPassword);

//     // Save to database
//     const user = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//       },
//     });

//     return { success: true, userId: user.id };
//   } catch (error) {
//     throw error; // Let error handler middleware deal with it
//   }
// };

// // Example usage in user login
// export const loginUser = async (email: string, plainPassword: string) => {
//   const user = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (!user) {
//     throw ErrorHandler.unauthorized('Invalid credentials');
//   }

//   const isValidPassword = await passwordService.verifyPassword(
//     plainPassword,
//     user.password
//   );

//   if (!isValidPassword) {
//     throw ErrorHandler.unauthorized('Invalid credentials');
//   }

//   // Check if password needs rehashing
//   if (passwordService.needsRehash(user.password)) {
//     const newHashedPassword = await passwordService.hashPassword(plainPassword);
//     await prisma.user.update({
//       where: { id: user.id },
//       data: { password: newHashedPassword },
//     });
//   }

//   return { success: true, user: { id: user.id, email: user.email } };
// };

// // Password reset functionality
// export const requestPasswordReset = async (email: string) => {
//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user) {
//     // Don't reveal if email exists
//     return { success: true, message: 'If email exists, reset link sent' };
//   }

//   const { token, hashedToken, expiresAt } = passwordService.generateResetToken();

//   await prisma.passwordResetToken.create({
//     data: {
//       userId: user.id,
//       token: hashedToken,
//       expiresAt,
//     },
//   });

//   // Send email with `token` (not hashedToken)
//   // await sendPasswordResetEmail(email, token);

//   return { success: true, message: 'Password reset link sent' };
// };

// export const resetPassword = async (token: string, newPassword: string) => {
//   const hashedToken = passwordService.hashResetToken(token);

//   const resetToken = await prisma.passwordResetToken.findFirst({
//     where: {
//       token: hashedToken,
//       expiresAt: { gt: new Date() },
//       used: false,
//     },
//     include: { user: true },
//   });

//   if (!resetToken) {
//     throw ErrorHandler.badRequest('Invalid or expired reset token');
//   }

//   const hashedPassword = await passwordService.hashPassword(newPassword);
