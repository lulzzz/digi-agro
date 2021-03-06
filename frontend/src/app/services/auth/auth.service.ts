import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Constants} from '../../common/constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Authorities} from '../../common/authorities';
import {LangService} from '../lang.service';
import {StorageService} from '../storage.service';
import {AuthResponseModel} from './auth-response.model';
import {AuthRequestModel} from './auth-request.model';
import { environment } from '../../../environments/environment';
import {UserAccountModel} from '../../pages/enterprise/manage-users/user/user-account.model';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private api: string = environment.apiUrl + '/auth';

    userChanged: EventEmitter<void> = new EventEmitter();

    constructor(private http: HttpClient,
                private router: Router,
                private storageService: StorageService,
                private langService: LangService) {
    }

    logout() {
        this.storageService.clear();
        this.langService.restoreLanguage();
        this.userChanged.emit();
    }

    login(model: AuthRequestModel): Observable<AuthResponseModel> {
        return this.http.post<AuthResponseModel>(this.api + '/login', model);
    }

    finishLogin(authData: AuthResponseModel) {
        const userData = {username: authData.username, token: authData.token, logoUrl: authData.logoUrl};
        this.storageService.setItem(Constants.USER_DATA, JSON.stringify(userData));
        this.langService.setLanguage(authData.language);
        this.setupAuthorities(authData.authorities);
        this.userChanged.emit();
    }

    setupAuthorities(authorities: string[]) {
        this.storageService.setItem(Authorities.AUTHORITY_OBJECT, '{}');
        const authorityObject = {};
        authorities.forEach(authority => {
            authorityObject[authority] = true;
        });
        this.storageService.setItem(Authorities.AUTHORITY_OBJECT, JSON.stringify(authorityObject));
        this.userChanged.emit();
    }

    checkAuth() {
        if (!this.isAuthenticated()) {
            this.router.navigate([Constants.LOGIN_PAGE]);
        }
    }

    isAuthenticated(): boolean {
        return !!this.storageService.getItem(Constants.USER_DATA);
    }

    getUsername(): string {
        const userData = JSON.parse(this.storageService.getItem(Constants.USER_DATA));
        if (userData) {
            return userData.username;
        }
        return null;
    }

    getUserData() {
        return JSON.parse(this.storageService.getItem(Constants.USER_DATA));
    }

    fetchCurrentUser(): Observable<UserAccountModel> {
        return this.http.get<UserAccountModel>(this.api + '/current-ser');
    }

    getToken(): String {
        const userData = JSON.parse(this.storageService.getItem(Constants.USER_DATA));
        return userData && userData.token ? userData.token : '';
    }

    createTokenHeader() {
        const headers = {};
        headers[Constants.AUTH_HEADER] = Constants.TOKEN_PREFIX + this.getToken();
        const tenant = this.storageService.getItem(Constants.TENANT);
        if (tenant) {
            headers[Constants.TENANT] = tenant;
        }
        return headers;
    }

    hasAuthority(authorityName) {
        const authorityObject = this.storageService.getItem(Authorities.AUTHORITY_OBJECT);
        return this.isAuthenticated() && JSON.parse(authorityObject)[authorityName];
    }

    isSuperAdmin() {
        return this.hasAuthority(Authorities.ROLE_SUPER_ADMIN);
    }

    isAdmin() {
        return this.hasAuthority(Authorities.ROLE_ADMIN);
    }

    updateUser(model: UserAccountModel) {
        const userData = JSON.parse(this.storageService.getItem(Constants.USER_DATA));
        userData.logoUrl = model.logoUrl;
        this.storageService.setItem(Constants.USER_DATA, JSON.stringify(userData));
        this.langService.setLanguage(model.language);
        this.userChanged.emit();
    }

}
