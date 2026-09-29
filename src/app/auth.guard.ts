import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * @description Route guard that only lets logged-in users through.
 * Anyone without a token is sent back to the welcome page.
 */
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  return localStorage.getItem('token') ? true : router.parseUrl('/welcome');
};
