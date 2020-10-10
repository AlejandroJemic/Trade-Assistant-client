import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MesagesPage } from './mesages.page';

describe('MesagesPage', () => {
  let component: MesagesPage;
  let fixture: ComponentFixture<MesagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MesagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
