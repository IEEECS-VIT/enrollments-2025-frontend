const STORAGE_KEY_PREFIX = "quiz_answers_";

export const saveAnswersToLocalStorage = (
  subdomain: string,
  answers: Record<number, string | number>
) => {
  localStorage.setItem(
    `${STORAGE_KEY_PREFIX}${subdomain}`,
    JSON.stringify(answers)
  );
};

export const loadAnswersFromLocalStorage = (
  subdomain: string
): Record<number, string | number> => {
  const storedAnswers = localStorage.getItem(
    `${STORAGE_KEY_PREFIX}${subdomain}`
  );
  return storedAnswers ? JSON.parse(storedAnswers) : {};
};

export const clearAnswersFromLocalStorage = (subdomain: string) => {
  localStorage.removeItem(`${STORAGE_KEY_PREFIX}${subdomain}`);
};
