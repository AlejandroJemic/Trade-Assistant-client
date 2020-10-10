import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WaletPage } from './walet.page';

describe('WaletPage', () => {
  let component: WaletPage;
  let fixture: ComponentFixture<WaletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaletPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WaletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
