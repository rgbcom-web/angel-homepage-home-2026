export { cn } from "@/shared/shadcn/lib/utils";

export function langContent(lang, content) {
  return content[lang];
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function throttle(callback, delay) {
  let last;
  let timer;
  return function () {
    const context = this;
    const now = +new Date();
    const args = arguments;
    if (last && now < last + delay) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        callback.apply(context, args);
      }, delay);
    } else {
      last = now;
      callback.apply(context, args);
    }
  };
}

/**
 * 옵션 리스트를 생성합니다.
 * @param {Array} list - 옵션 리스트
 * @param {boolean} useAll - 전체 옵션 사용 여부
 * @returns {Array} 옵션 리스트
 */
export function arrayToOptions(list, useAll = false, labelTransform) {
  const options = list.map((item) => ({
    label: labelTransform ? labelTransform(item) : item,
    value: item,
  }));

  if (useAll) {
    return [{ label: "전체", value: "" }, ...options];
  }

  return options;
}

export function telFilter(val) {
  const numbersOnly = val.replace(/\D/g, "");

  if (numbersOnly.startsWith("02")) {
    if (numbersOnly.length <= 9) {
      return numbersOnly.replace(/(\d{2})(\d{0,3})(\d{0,4})/, (match, p1, p2, p3) =>
        [p1, p2, p3].filter(Boolean).join("-"),
      );
    } else {
      return numbersOnly
        .slice(0, 9)
        .replace(/(\d{2})(\d{0,3})(\d{0,4})/, (match, p1, p2, p3) =>
          [p1, p2, p3].filter(Boolean).join("-"),
        );
    }
  } else if (numbersOnly.startsWith("010") || numbersOnly.startsWith("070")) {
    if (numbersOnly.length <= 11) {
      return numbersOnly.replace(/(\d{3})(\d{0,4})(\d{0,4})/, (match, p1, p2, p3) =>
        [p1, p2, p3].filter(Boolean).join("-"),
      );
    } else {
      return numbersOnly
        .slice(0, 11)
        .replace(/(\d{3})(\d{0,4})(\d{0,4})/, (match, p1, p2, p3) =>
          [p1, p2, p3].filter(Boolean).join("-"),
        );
    }
  } else {
    if (numbersOnly.length <= 10) {
      return numbersOnly.replace(/(\d{3})(\d{0,3})(\d{0,4})/, (match, p1, p2, p3) =>
        [p1, p2, p3].filter(Boolean).join("-"),
      );
    } else {
      return numbersOnly
        .slice(0, 10)
        .replace(/(\d{3})(\d{0,3})(\d{0,4})/, (match, p1, p2, p3) =>
          [p1, p2, p3].filter(Boolean).join("-"),
        );
    }
  }
}

// 이메일 형식인지 확인
export function checkEmail(val) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(val);
}

export function numberPad(val, length = 2) {
  return val.toString().padStart(length, "0");
}
