/**
 * Calculate years of professional experience from start date
 * @param startDate - Career start date (format: YYYY-MM-DD)
 * @returns Formatted string like "8+" or "10+"
 */
export function calculateYearsOfExperience(startDate: string): string {
  const start = new Date(startDate);
  const now = new Date();

  const years = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();

  // Adjust if we haven't reached the anniversary month yet
  const adjustedYears = monthDiff < 0 ? years - 1 : years;

  return `${adjustedYears}+`;
}

// Your career start date (August 2017 based on your first job at TPRA)
export const CAREER_START_DATE = "2017-08-01";

// Pre-calculated value for easy import
export const yearsOfExperience = calculateYearsOfExperience(CAREER_START_DATE);
