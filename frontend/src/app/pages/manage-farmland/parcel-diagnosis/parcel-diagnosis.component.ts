import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ParcelDiagnosisModel} from './parcel-diagnosis.model';
import {ParcelService} from '../../../services/parcel/parcel.service';
import {AlertService} from '../../../services/alert.service';
import {ParcelDiagnosisSummarizerComponent} from './parcel-diagnosis-summarizer/parcel-diagnosis-summarizer.component';
import {ParcelDiagnosisMapComponent} from './parcel-diagnosis-map/parcel-diagnosis-map.component';
import {ParcelSeasonModel} from '../parcel-season.model';
import {ParcelCropSeasonService} from '../../../services/parcel/parcel-crop-season.service';

@Component({
    selector: 'app-parcel-diagnosis',
    templateUrl: './parcel-diagnosis.component.html',
    styleUrls: ['./parcel-diagnosis.component.scss']
})
export class ParcelDiagnosisComponent implements OnInit {

    @ViewChild(ParcelDiagnosisSummarizerComponent) parcelDiagnosisSummarizerComponent;
    @ViewChild(ParcelDiagnosisMapComponent) parcelDiagnosisMapComponent;

    parcelDiagnosisModel: ParcelDiagnosisModel;
    parcelSeasonModel: ParcelSeasonModel;

    tabIndex = 1;
    loadedTabs = {1: true};

    constructor(private router: Router,
                private route: ActivatedRoute,
                private parcelService: ParcelService,
                private parcelCropSeasonService: ParcelCropSeasonService,
                private alertService: AlertService) {
    }

    ngOnInit() {
        this.restoreModel();
    }

    changeTab(tabIndex) {
        this.tabIndex = tabIndex;
        this.loadedTabs[this.tabIndex] = true;
    }

    private restoreModel() {
        this.route.params.subscribe(params => {
            const id = params['id'];
            const harvestYear = 2019;
            this.setupModel(id, harvestYear);
        });
    }


    private setupModel(parcelId, harvestYear) {
        this.parcelCropSeasonService.findYearSeasonParcel(harvestYear, parcelId).subscribe(model => {
            if (model.id != null) {
                this.parcelSeasonModel = model;
            }
        });
    }

    save() {
        // const generalFormValid = this.parcelGeneralFormComponent.submit();
        // if (!generalFormValid) {
        //     this.alertService.validationFailed();
        //     return;
        // }
        //
        // const isNew = this.parcelModel.id == null;
        // if (isNew && !this.parcelMapEditorComponent) {
        //     this.alertService.warning('parcel.complete-map');
        //     return;
        // }
        //
        // if (this.parcelMapEditorComponent) {
        //     const mapValid = this.parcelMapEditorComponent.submit();
        //     if (!mapValid) {
        //         this.alertService.warning('parcel.complete-map');
        //         return;
        //     }
        // }
        //
        // this.parcelService.save(this.parcelModel).subscribe(model => {
        //     this.parcelModel = model;
        //     this.parcelService.adjust([this.parcelModel]);
        //     this.alertService.saved();
        // });
        //
        // this.parcelSeasonModel = this.parcelCropFormComponent.parcelSeasonModel;
        //
        // this.parcelCropSeasonService.saveYearSeason(this.parcelSeasonModel).subscribe(model => {
        //     this.parcelSeasonModel = model;
        //     // this.parcelService.adjust([this.parcelModel]);
        //     this.alertService.saved();
        // });
    }

    back() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

}
