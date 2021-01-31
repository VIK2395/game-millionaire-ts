const truetypeof = (elem: any): string => Object.prototype.toString.call(elem).slice(8, -1);

export default function isGameConfigDataStructureValid(gameConfigData: any): boolean {
  return (
    truetypeof(gameConfigData) === 'Array' &&
    gameConfigData.every(
      (scoreQuestion: any) =>
        truetypeof(scoreQuestion) === 'Object' &&
        scoreQuestion.hasOwnProperty('questionScore') &&
        truetypeof(scoreQuestion.questionScore) === 'Number' &&
        scoreQuestion.hasOwnProperty('questions') &&
        truetypeof(scoreQuestion.questions) === 'Array' &&
        scoreQuestion.questions.every(
          (question: any) =>
            truetypeof(question) === 'Object' &&
            question.hasOwnProperty('questionText') &&
            truetypeof(question.questionText) === 'String' &&
            question.hasOwnProperty('answers') &&
            truetypeof(question.answers) === 'Array' &&
            question.answers.every(
              (answer: any) =>
                truetypeof(answer) === 'Object' &&
                answer.hasOwnProperty('answerId') &&
                truetypeof(answer.answerId) === 'String' &&
                answer.hasOwnProperty('answerText') &&
                truetypeof(answer.answerText) === 'String' &&
                answer.hasOwnProperty('isCorrect') &&
                truetypeof(answer.isCorrect) === 'Boolean'
            )
        )
    )
  );
}
