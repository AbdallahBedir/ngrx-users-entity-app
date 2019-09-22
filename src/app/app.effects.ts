import { Injectable } from '@angular/core';
import { Actions, createEffect,ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AppService } from './services/app.service';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions,
        private appService:AppService) {
  }

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType('[User/API] Load Users'),
    mergeMap(() => this.appService.loadUsers()
      .pipe(
        map(users => ({ type: '[User/API] Users Loaded Success', users: users })),
        catchError(() => EMPTY)
      ))
    )
  );
}
