import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ISubmitExamPayload } from "@/features/questions/types/submissions";

type ExamResultProps = {
  result: ISubmitExamPayload;
};

export default function ExamResult({ result }: ExamResultProps) {
  const { submission, analytics } = result;

  const wrongAnswers = analytics.filter((item) => item.isCorrect === false);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-blue-600">Results:</h3>

      <div className="grid grid-cols-[250px_1fr] gap-6">
        <div className="rounded bg-blue-50 p-6">
          <p className="text-lg font-semibold">Score: {submission.score}%</p>

          <div className="mt-4 space-y-2 text-sm">
            <p className="text-green-600">
              Correct: {submission.correctAnswers}
            </p>

            <p className="text-red-600">
              Incorrect: {submission.wrongAnswers}
            </p>

            <p>Total: {submission.totalQuestions}</p>
          </div>
        </div>

        <div className="space-y-6 overflow-auto pr-2">
          {wrongAnswers.length === 0 ? (
            <p className="rounded bg-green-50 p-4 text-sm text-green-700">
              Great job! All answers are correct.
            </p>
          ) : (
            wrongAnswers.map((item) => (
              <div key={item.questionId} className="space-y-4">
                <h3 className="pb-2 text-2xl font-semibold text-blue-600">
                  {item.questionText}
                </h3>

                <RadioGroup
                  value={item.selectedAnswer.id}
                  disabled
                  className="space-y-3"
                >
                  <FieldLabel
                    htmlFor={`${item.questionId}-selected`}
                    className="rounded-none border-none bg-red-50  hover:bg-red-50"
                  >
                    <Field orientation="horizontal">
                      <RadioGroupItem
                        className="size-4 border-red-600 fill-red-500"
                        value={item.selectedAnswer.id}
                        id={`${item.questionId}-selected`}
                      />

                      <FieldContent>
                        <FieldTitle>
                         {item.selectedAnswer.text}
                        </FieldTitle>
                      </FieldContent>
                    </Field>
                  </FieldLabel>

                  <FieldLabel
                    htmlFor={`${item.questionId}-correct`}
                    className="rounded-none border-none bg-green-50  hover:bg-green-50"
                  >
                    <Field orientation="horizontal">
                      <RadioGroupItem
                        className="size-4 border-green-600"
                        value={item.correctAnswer.id}
                        id={`${item.questionId}-correct`}
                      />

                      <FieldContent>
                        <FieldTitle>
                          Correct answer: {item.correctAnswer.text}
                        </FieldTitle>
                      </FieldContent>
                    </Field>
                  </FieldLabel>
                </RadioGroup>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}