/**
 * 판별·기한 산정에 쓰는 과제 데이터 (지시서 4장 projects 문서 중 해당 항목)
 * 날짜는 모두 ISO 문자열 "YYYY-MM-DD" (시간대 영향 배제)
 */
import type { RegimeKey } from './regimes';

export type ProjectType = 'A' | 'B' | 'C';

export type Evaluator = { name?: string; score?: number | null };

export type ProjectInput = {
  id?: string;
  type: ProjectType;
  reviewName?: string;            // "심의O" | "심의X"
  startDate?: string | null;
  endDate?: string | null;
  regimeOverride?: RegimeKey | null;
  review?: { no?: string; ym?: string; result?: string; date?: string | null };
  contract?: { notice?: string };
  reports?: { kickoff?: string; interim?: string; final?: string };
  evaluation?: {
    evalDate?: string;
    submittedAt?: string;
    resultDoc?: string;
    evaluators?: Evaluator[];
  };
  finalReport?: { status?: string; docNo?: string; submittedAt?: string; delayRequested?: string };
  publication?: { homepageRegisteredAt?: string };
  checklist?: string;
};
