import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';



export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  return auth.isloggedIn;
};

export const authAdmin: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  return auth.isAdmin;
};
