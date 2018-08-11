import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CropService} from "../../../services/crop.service";
import {CropCategoryModel} from "../../crop/crop-category.model";
import {CropModel} from "../../crop/crop.model";
import {CropVarietyModel} from "../../crop/crop-variety.model";
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from "angular-2-dropdown-multiselect";
import {ParcelService} from "../../../services/parcel.service";
import {LangService} from "../../../services/lang.service";
import {ToastrService} from "ngx-toastr";
import {Messages} from "../../../common/messages";
import {Router} from "@angular/router";
import {ForecastService} from "../../../services/forecast.service";
import {ForecastModel} from "../forecast.model";

@Component({
    selector: 'az-forecast-harvest',
    templateUrl: './forecast-harvest.component.html'
})

export class ForecastHarvestComponent implements OnInit {

    private form: FormGroup;
    private formSubmitted: boolean = false;

    private parcels: IMultiSelectOption[];
    private categories: CropCategoryModel[] = [];
    private crops: CropModel[] = [];
    private cropVarieties: CropVarietyModel[] = [];

    public parcelControlSettings: IMultiSelectSettings = {
        checkedStyle: 'fontawesome',
        buttonClasses: 'btn btn-secondary btn-block',
        dynamicTitleMaxItems: 3,
        displayAllSelectedText: true,
        showCheckAll: true,
        showUncheckAll: true
    };

    public parcelControlTexts: IMultiSelectTexts = {
        checkAll: 'Select all',
        uncheckAll: 'Unselect all',
        checked: 'item selected',
        checkedPlural: 'items selected',
        defaultTitle: 'Select parcels',
        allSelected: 'All selected',
    };

    labelSaved: string;
    labelValidationFail: string;

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private forecastService: ForecastService,
                private cropService: CropService,
                private parcelService: ParcelService,
                private langService: LangService,
                private toastrService: ToastrService,) {
    }

    ngOnInit() {
        this.setupLabels();
        this.buildForm();
        this.setupParcels();
        this.setupCropCategories();
    }

    private setupLabels() {
        this.langService.get(Messages.SAVED).subscribe((message) => this.labelSaved = message);
        this.langService.get(Messages.VALIDATION_FAIL).subscribe((message) => this.labelValidationFail = message);
    }

    private buildForm() {
        this.form = this.formBuilder.group({
            parcels: [null, Validators.required],
            forecastName: [null, Validators.compose([Validators.required, Validators.maxLength(256)])],
            harvestingYear: [null, Validators.required],
            cropCategoryId: [null, Validators.required],
            cropId: [null, Validators.required],
            cropVarietyId: [null],
            description: [null, Validators.maxLength(1024)],
            unitPrice: [null, Validators.required],
            currency: [null, Validators.required],
            unitOfMeasure: [null, Validators.required],
            quantityHectar: [null, Validators.required]
        });
    }

    private setupParcels() {
        this.parcelService.find().subscribe(models => {
            this.parcels = models.map((model) => {
                return {
                    id: model.id,
                    name: model.name
                };
            });
        });
    }

    private setupCropCategories() {
        this.cropService.findCategories().subscribe(payloadModel => {
            let status = payloadModel.status;
            let message = payloadModel.message;
            this.categories = payloadModel.payload;
        });
    }

    private onCropCategoryChange() {
        let cropCategoryId = this.form.controls['cropCategoryId'].value;
        this.setupCrops(cropCategoryId);
        this.crops = [];
        this.cropVarieties = [];
        this.form.controls['cropId'].setValue(null);
        this.form.controls['cropVarietyId'].setValue(null);
    }

    private setupCrops(categoryId: number) {
        this.cropService.findCrops(categoryId).subscribe(payloadModel => {
            let status = payloadModel.status;
            let message = payloadModel.message;
            this.crops = payloadModel.payload;
        });
    }

    private onCropChange() {
        let cropId = this.form.controls['cropId'].value;
        this.setupCropVarieties(cropId);
        this.cropVarieties = [];
        this.form.controls['cropVarietyId'].setValue(null);
    }

    private setupCropVarieties(cropId: number) {
        this.cropService.findVarieties(cropId).subscribe(payloadModel => {
            let status = payloadModel.status;
            let message = payloadModel.message;
            this.cropVarieties = payloadModel.payload;
        });
    }

    onSubmit() {
        this.formSubmitted = true;

        if (!this.form.valid) {
            this.toastrService.warning(this.labelValidationFail);
            return;
        }

        let forecastModel = new ForecastModel();
        Object.assign(forecastModel, this.form.value);

        this.formSubmitted = false;

        this.forecastService.save(forecastModel).subscribe(() => {
            this.toastrService.success(this.labelSaved);
            this.router.navigate(['/pages/forecasting/harvesting']);
        });
    }

}
