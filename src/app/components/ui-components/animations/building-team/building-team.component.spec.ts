import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingTeamComponent } from './building-team.component';

describe('BuildingTeamComponent', () => {
  let component: BuildingTeamComponent;
  let fixture: ComponentFixture<BuildingTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
