import { TestBed, async, inject } from '@angular/core/testing';

import { CursoResolverGuard } from './curso-resolver.guard';

describe('CursoResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CursoResolverGuard]
    });
  });

  it('should ...', inject([CursoResolverGuard], (guard: CursoResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
