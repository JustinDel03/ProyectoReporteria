import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportConversationsComponent } from './report-conversations.component';

describe('ReportConversationsComponent', () => {
  let component: ReportConversationsComponent;
  let fixture: ComponentFixture<ReportConversationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportConversationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportConversationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
