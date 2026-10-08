/** Maps a numeric self-assessment to a translated proficiency label key. */
export function skillLevelKey(level: number): string {
  if (level >= 80) return 'level.advanced';
  if (level >= 65) return 'level.intermediate';
  return 'level.basic';
}
