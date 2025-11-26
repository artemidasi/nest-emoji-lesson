import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

import { createMock } from '@golevelup/ts-jest';

describe('AuthGuard', () => {
  const authGuard = new AuthGuard();

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('should return true if there`s a valid API key', () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => {
          return {
            header: () => 'SECRET',
          };
        },
      }),
    });

    const result = authGuard.canActivate(context);

    expect(result).toBe(true);
  });

  it('should return true if there`s no header is passed in', () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => {
          return {
            header: () => 'INVALID',
          };
        },
      }),
    });

    const result = authGuard.canActivate(context);

    expect(result).toBe(false);
  });
});
