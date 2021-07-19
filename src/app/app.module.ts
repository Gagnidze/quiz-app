import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectionComponent } from './main-display/selection.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionCardComponent } from './question-card/question-card.component'
import { StoreModule } from '@ngrx/store';
import * as mainStore from './app.reducer'
import { EffectsModule } from '@ngrx/effects';
import { questionsEffects } from './shared/store/requests.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SelectionComponent,
    QuestionCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(
      mainStore.AppReducer
    ),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
    EffectsModule.forRoot([questionsEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
