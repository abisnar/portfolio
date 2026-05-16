import { resume } from '../data/resume';
import type { Resume } from '../models/Resume';

export function useResume(): Resume {
  return resume;
}
