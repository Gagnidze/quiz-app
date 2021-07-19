import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { GetQuestions } from '../shared/store/requests.actions';
import { ResetData, ToggleModes, UpdateSelection } from './store/selection.actions';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})

export class SelectionComponent implements OnInit, OnDestroy {
  index: number | '';
  quizMode: boolean;
  scoreToShow: number;

  selectionSliceSubscription: Subscription;

  selectionForm = new FormGroup({
    category: new FormControl(),
    difficulty: new FormControl(),
    questionType: new FormControl()
  });

  categoriesArr: string[] = [
    'Any Category',
    'General Knowledge',
    'Entertainment: Books',
    'Entertainment: Film',
    'Entertainment: Music',
    'Entertainment: Musicals & Theaters',
    'Entertainment: Television',
    'Entertainment: Video Games',
    'Entertainment: Board Games',
    'Science & Nature',
    'Science: Computers',
    'Science: Mathematics',
    'Mythology',
    'Sports',
    'Geography',
    'History',
    'Politics',
    'Art',
    'Celebrities',
    'Animals',
    'Vehicles',
    'Entertainment: Comics',
    'Science: Gadgets',
    'Entertainment: Japanese Anime & Manga',
    'Entertainment: Cartoon & Animations',
  ]


  constructor(
    private store: Store<AppState>
  ) { }

  getData() {
    if (this.selectionForm.value.category === 'Any Category' || this.selectionForm.value.category < 8) {
      this.index = undefined;
    } else {
      this.index = this.categoriesArr.indexOf(this.selectionForm.value.category) + 8;
    }

    this.store.dispatch(ResetData());

    this.store.dispatch(UpdateSelection(
      {
        payload: {
          id: this.index,
          difficulty: this.selectionForm.value.difficulty,
          type: this.selectionForm.value.questionType
        }
      }))

    this.store.dispatch(GetQuestions({
      id: this.index,
      difficulty: this.selectionForm.value.difficulty,
      questionType: this.selectionForm.value.questionType
    }))

    this.store.dispatch(ToggleModes());
  }

  ngOnInit() {

    this.selectionForm.patchValue({
      category: 'Any Category',
      difficulty: '',
      questionType: ''
    });

    this.selectionSliceSubscription = this.store.select('selection').subscribe(
      (selectionSlice) => {
        this.quizMode = selectionSlice.quizMode;
        this.scoreToShow = selectionSlice.score;
      }
    )
  }

  ngOnDestroy() {
    this.selectionSliceSubscription.unsubscribe();
  }

}