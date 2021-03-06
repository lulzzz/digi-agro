import {Injectable} from '@angular/core';
import {LangService} from './lang.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private langService: LangService,
                private toastrService: ToastrService) {
    }

    public saved() {
        const message = this.langService.instant('response.saved');
        this.toastrService.success(message);
    }

    public removed() {
        const message = this.langService.instant('response.removed');
        this.toastrService.success(message);
    }

    public validationFailed() {
        const message = this.langService.instant('validation.fail');
        this.toastrService.warning(message);
    }

    public warning(key) {
        const message = this.langService.instant(key);
        this.toastrService.warning(message);
    }

}
