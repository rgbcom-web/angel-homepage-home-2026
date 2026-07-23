/**
 * 설문 문항 타입 (관리자·포털 공통)
 * text | textarea | single | multi | rating
 */

export const SURVEY_QUESTION_TYPES = [
  { value: "text", label: "단답형" },
  { value: "textarea", label: "장문형" },
  { value: "single", label: "객관식 (단일)" },
  { value: "multi", label: "객관식 (복수)" },
  { value: "rating", label: "점수 (1~5)" },
];

export function normalizeSurveyQuestions(raw) {
  let parsed = raw;
  if (typeof raw === "string") {
    try {
      parsed = JSON.parse(raw);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(parsed)) return [];

  return parsed
    .map((item, index) => {
      const type = SURVEY_QUESTION_TYPES.some((t) => t.value === item?.type)
        ? item.type
        : "text";
      const label = String(item?.label || "").trim();
      if (!label) return null;

      const needsOptions = type === "single" || type === "multi";
      const options = needsOptions
        ? (Array.isArray(item.options) ? item.options : [])
            .map((opt) => String(opt || "").trim())
            .filter(Boolean)
        : [];

      if (needsOptions && options.length < 2) return null;

      return {
        id: String(item?.id || `q-${index + 1}`),
        type,
        label,
        required: item?.required !== false,
        options,
      };
    })
    .filter(Boolean);
}
