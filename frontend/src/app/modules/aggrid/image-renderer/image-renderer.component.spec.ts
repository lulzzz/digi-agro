import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageRendererComponent} from './image-renderer.component';

describe('CustomImageRendererComponent', () => {
    let component: ImageRendererComponent;
    let fixture: ComponentFixture<ImageRendererComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ImageRendererComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImageRendererComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
