import { IConfigDataQuestion } from '../types';

export default function isAllScoreQuestionsAvailable(
  scoreDashboard: number[],
  gameGonfigData: IConfigDataQuestion[]
): boolean {
  for (let i = 0; i < scoreDashboard.length; i++) {
    if (gameGonfigData.findIndex(({ questionScore }) => questionScore === scoreDashboard[i]) === -1)
      return false;
  }
  return true;
}
