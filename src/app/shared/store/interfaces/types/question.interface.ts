// export interface question {
//     category: string
//     correct_answer: string
//     difficulty: string
//     incorrect_answers: string[]
//     question: string
//     type: string
//     allAnswers?: string[]
// }
export class question {
    constructor(
        public category: string,
        public correct_answer: string,
        public difficulty: string,
        public incorrect_answers: string[],
        public question: string,
        public type: string,
        public allAnswers?: string[]
    ) { }

}