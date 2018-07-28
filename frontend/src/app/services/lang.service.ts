import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Constants} from "../common/constants";
import {StorageService} from "./storage.service";

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
    }

    restoreLanguage() {
        let language = this.storageService.getItem(Constants.LANGUAGE_KEY);
        if (language) {
            this.translate.use(language);
        }
        else {
            this.setupDefault();
        }
    }

    setLanguage(language) {
        if (language) {
            this.storageService.setItem(Constants.LANGUAGE_KEY, language);
            this.translate.use(language);
        }
        else {
            this.setupDefault();
        }
    }

    getLanguage() {
        return this.storageService.getItem(Constants.LANGUAGE_KEY);
    }

    get(key) {
        return this.translate.get(key);
    }
}
