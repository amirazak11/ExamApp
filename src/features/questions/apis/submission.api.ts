
import { ISubmitExamBody } from "../types/submissions";
export async function sendAnswer(body: ISubmitExamBody) {
  const response = await fetch(`/api/submissions`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  const payload = await response.json();
console.log(payload);

  if (!response.ok) {
    throw new Error(payload.message || "Failed to submit exam");
  }

  return payload;
}
