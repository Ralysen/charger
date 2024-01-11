export class ResponseUtils {
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
