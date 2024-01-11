import { Logger } from '@nestjs/common';

export class ResponseUtils {
  private readonly logger = new Logger();
  static sendResponse<T>(
    statusCode: number = 200,
    resMessage: string,
    body?: T,
  ) {
    return {
      status: statusCode,
      message: resMessage,
      body,
    };
  }
}
