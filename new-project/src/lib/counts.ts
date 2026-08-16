import { OPERATION_AGENTS } from "@/lib/operations/agents";
import { TOOLS } from "@/lib/tools";

const UNDER_TWENTY = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

const TENS = ["", "", "twenty", "thirty", "forty", "fifty"];

export function wordsForCount(n: number): string {
  if (n < 20) return UNDER_TWENTY[n] ?? String(n);
  if (n < 60) {
    const ten = Math.floor(n / 10);
    const one = n % 10;
    if (one === 0) return TENS[ten] ?? String(n);
    return `${TENS[ten]}-${UNDER_TWENTY[one]}`;
  }
  return String(n);
}

function titleCaseCount(n: number): string {
  const words = wordsForCount(n);
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export const ROOM_COUNT = TOOLS.length;
export const AGENT_COUNT = OPERATION_AGENTS.length;
export const ROOM_COUNT_WORDS = wordsForCount(ROOM_COUNT);
export const AGENT_COUNT_WORDS = wordsForCount(AGENT_COUNT);
export const ROOM_COUNT_TITLE = titleCaseCount(ROOM_COUNT);
export const AGENT_COUNT_TITLE = titleCaseCount(AGENT_COUNT);
