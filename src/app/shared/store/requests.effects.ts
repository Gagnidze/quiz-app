import { Injectable } from "@angular/core";
import { map, switchMap } from 'rxjs/operators'

import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as requestsActions from './requests.actions'
import { HttpClient } from "@angular/common/http";
import { question } from "./interfaces/types/question.interface";
@Injectable()

export class questionsEffects {
    getQuestions = createEffect(
        () => this.actions.pipe(
            ofType(requestsActions.GetQuestions),
            switchMap(
                (prop) => {
                    let tester = '';

                    prop.id ? tester = tester.concat(`&category=` + prop.id) : '';
                    prop.difficulty ? tester = tester.concat(`&difficulty=` + prop.difficulty) : '';
                    prop.questionType ? tester = tester.concat(`&type=` + prop.questionType) : '';

                    return this.http.get<{ results: question[] }>('https://opentdb.com/api.php?amount=10' + tester
                    ).pipe(
                        map(
                            (res) => {
                                return requestsActions.SetQuestions({ payload: res.results })
                            }
                        )
                    )
                }
            )
        )
    )

    constructor(
        private actions: Actions,
        private http: HttpClient
    ) { }
}