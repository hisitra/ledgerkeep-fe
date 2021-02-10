import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  public CustomCodes = {
    Unauthorized: 'UNAUTHORIZED_OPERATION_ERROR',
    TokenExpired: 'TOKEN_EXPIRED',
    CategoryAlreadyExists: 'CATEGORY_ALREADY_EXISTS',
  };

  public Errors = {
    Default: new Error('Please try again later.'),
    SessionExpired: new Error('Your session has expired.'),
    PleaseLoginAgain: new Error('Please login again.'),
  };

  constructor() {}
}
