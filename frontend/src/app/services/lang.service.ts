import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Constants} from '../common/constants';
import {StorageService} from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class LangService {

    constructor(private translate: TranslateService,
                private storageService: StorageService) {
    }

    setupDefault() {
        const language = 'en';
        this.translate.setDefaultLang(language);
        this.translate.use(language);
        this.storageService.setItem(Constants.LANGUAGE_KEY, language);
        moment.locale(language);
    }

    restoreLanguage() {
        const language = this.storageService.getItem(Constants.LANGUAGE_KEY);
        if (language) {
            this.translate.use(language);
            moment.locale(language);
        } else {
            this.setupDefault();
        }
    }

    setLanguage(language) {
        if (language) {
            this.storageService.setItem(Constants.LANGUAGE_KEY, language);
            this.translate.use(language);
            moment.locale(language);
        } else {
            this.setupDefault();
        }
    }

    getLanguage() {
        return this.storageService.getItem(Constants.LANGUAGE_KEY);
    }

    get(key, params?: Object) {
        return this.translate.get(key, params);
    }

    /*
    * https://github.com/ngx-translate/core
    * This method is synchronous and the default file loader is asynchronous.
    * You are responsible for knowing when your translations have been loaded and it is safe to use this method.
    * If you are not sure then you should use the get method instead
    * */
    instant(key, params?: Object) {
        return this.translate.instant(key, params);
    }
}
