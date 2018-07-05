import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Authorities} from "../common/authorities";


@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authService.hasAuthority(Authorities.ROLE_ADMIN)) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
