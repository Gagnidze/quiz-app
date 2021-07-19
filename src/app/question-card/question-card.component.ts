import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { AddPoint, ResetData, ToggleModes } from '../main-display/store/selection.actions';
import { question } from '../shared/store/interfaces/types/question.interface';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit, OnDestroy {
  allQuestions: question[];
  finalScore = 0;

  questionsSliceSub: Subscription;
  selectionSliceSub: Subscription;

  quizMode: boolean;

  n = 0;

  questionForm = new FormGroup({
    answers: new FormControl('', Validators.required)
  })

  constructor(private store: Store<AppState>) { }

  next() {
    if (this.questionForm.value.answers === this.allQuestions[this.n].correct_answer) {
      this.store.dispatch(AddPoint());
    }

    this.store.select('selection').subscribe(
      (selectionSlice) => {
        this.finalScore = selectionSlice.score;
      }
    )

    this.questionForm.reset();

    if (this.n < 9) {
      this.n++;
    } else {
      this.store.dispatch(ToggleModes());
      window.alert('Your final Score is ' + this.finalScore);
      this.store.dispatch(ResetData());
      this.n = 0;
    }
  }

  ngOnInit(): void {
    this.questionsSliceSub = this.store.select('questions').subscribe(
      (questionsSlice) => {
        this.allQuestions = questionsSlice.allQuestions;
      }
    )

    this.selectionSliceSub = this.store.select('selection').subscribe(
      (selectionSlice) => {
        this.quizMode = selectionSlice.quizMode;
      }
    )
  }


  ngOnDestroy() {
    this.selectionSliceSub.unsubscribe();
    this.questionsSliceSub.unsubscribe();
  }

}
