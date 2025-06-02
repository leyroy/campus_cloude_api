import { Request, Response, NextFunction } from "express";

// Custom error class
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public timestamp: string;
  public path?: string;
  public method?: string;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }

  setRequestInfo(path: string, method: string): this {
    this.path = path;
    this.method = method;
    return this;
  }
}

// Logger interface for dependency injection
interface Logger {
  error(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  info(message: string, meta?: any): void;
}

// Default console logger
class ConsoleLogger implements Logger {
  error(message: string, meta?: any): void {
    console.error(
      `[ERROR] ${message}`,
      meta ? JSON.stringify(meta, null, 2) : ""
    );
  }

  warn(message: string, meta?: any): void {
    console.warn(
      `[WARN] ${message}`,
      meta ? JSON.stringify(meta, null, 2) : ""
    );
  }

  info(message: string, meta?: any): void {
    console.log(`[INFO] ${message}`, meta ? JSON.stringify(meta, null, 2) : "");
  }
}

// Error response interface
interface ErrorResponse {
  success: false;
  error: {
    message: string;
    statusCode: number;
    timestamp: string;
    path?: string;
    method?: string;
    requestId?: string;
    stack?: string;
  };
}

export class ErrorHandler {
  private logger: Logger;
  private isDevelopment: boolean;

  constructor(
    logger?: Logger,
    isDevelopment: boolean = process.env.NODE_ENV === "development"
  ) {
    this.logger = logger || new ConsoleLogger();
    this.isDevelopment = isDevelopment;
  }

  // Express error middleware
  public handleError = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    let appError: AppError;

    // Convert known errors to AppError
    if (error instanceof AppError) {
      appError = error;
    } else {
      appError = this.convertToAppError(error);
    }

    // Add request info if not already present
    if (!appError.path && !appError.method) {
      appError.setRequestInfo(req.path, req.method);
    }

    // Log the error
    this.logError(appError, req);

    // Send error response
    this.sendErrorResponse(
      appError,
      res,
      req.headers["x-request-id"] as string
    );
  };

  // Convert various error types to AppError
  private convertToAppError(error: Error): AppError {
    console.log(error);
    // MongoDB/Mongoose errors
    if (error.name === "ValidationError") {
      return new AppError("Validation failed", 400);
    }

    if (error.name === "CastError") {
      return new AppError("Invalid data format", 400);
    }

    if (error.name === "MongoServerError" && (error as any).code === 11000) {
      return new AppError("Duplicate field value", 409);
    }

    // JWT errors
    if (error.name === "JsonWebTokenError") {
      return new AppError("Invalid token", 401);
    }

    if (error.name === "TokenExpiredError") {
      return new AppError("Token expired", 401);
    }

    // // Multer errors
    // if (error.name === "MulterError") {
    //   const multerError = error as any;
    //   if (multerError.code === "LIMIT_FILE_SIZE") {
    //     return new AppError("File too large", 413);
    //   }
    //   return new AppError("File upload error", 400);
    // }

    // Default for unknown errors
    return new AppError(
      this.isDevelopment ? error.message : "Internal server error",
      300,
      false
    );
  }

  // Log error with context
  private logError(error: AppError, req?: Request): void {
    const logData = {
      message: error.message,
      statusCode: error.statusCode,
      timestamp: error.timestamp,
      path: error.path || req?.path,
      method: error.method || req?.method,
      userAgent: req?.get("User-Agent"),
      ip: req?.ip,
      userId: (req as any)?.user?.id,
      requestId: req?.headers["x-request-id"],
      stack: this.isDevelopment ? error.stack : undefined,
    };

    if (error.statusCode >= 500) {
      this.logger.error("Server Error", logData);
    } else if (error.statusCode >= 400) {
      this.logger.warn("Client Error", logData);
    } else {
      this.logger.info("Error Info", logData);
    }
  }

  // Send formatted error response
  private sendErrorResponse(
    error: AppError,
    res: Response,
    requestId?: string
  ): void {
    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        message: error.message,
        statusCode: error.statusCode,
        timestamp: error.timestamp,
        path: error.path,
        method: error.method,
        requestId,
        ...(this.isDevelopment && { stack: error.stack }),
      },
    };

    res.status(error.statusCode).json(errorResponse);
  }

  // Handle uncaught exceptions and unhandled rejections
  public setupGlobalHandlers(): void {
    process.on("uncaughtException", (error: Error) => {
      this.logger.error("Uncaught Exception - Shutting down gracefully", {
        error: error.message,
        stack: error.stack,
      });

      process.exit(1);
    });

    process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
      this.logger.error("Unhandled Rejection - Shutting down gracefully", {
        reason: reason?.message || reason,
        stack: reason?.stack,
      });

      process.exit(1);
    });
  }

  // Async wrapper to catch async errors in route handlers
  public catchAsync = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  };

  // Create specific error types
  public static badRequest(message: string = "Bad Request"): AppError {
    return new AppError(message, 400);
  }

  public static unauthorized(message: string = "Unauthorized"): AppError {
    return new AppError(message, 401);
  }

  public static forbidden(message: string = "Forbidden"): AppError {
    return new AppError(message, 403);
  }

  public static notFound(message: string = "Resource not found"): AppError {
    return new AppError(message, 404);
  }

  public static conflict(message: string = "Conflict"): AppError {
    return new AppError(message, 409);
  }

  public static internal(message: string = "Internal Server Error"): AppError {
    return new AppError(message, 500, false);
  }
}


