import { TestBed, inject } from '@angular/core/testing';

import { SuscripcionService } from './suscripcion.service';

describe('SuscripcionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[SuscripcionService]
    });
   
  });

  it('should be created', inject([SuscripcionService],(service:SuscripcionService)=>{
    expect(service).toBeTruthy();
  }));
});
