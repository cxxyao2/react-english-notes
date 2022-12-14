export type LanguageType = 'fr' | 'en'
export type CategoryType = 'word' | 'topic'
export type IndustryType =
  | 'finance'
  | 'IT'
  | 'weather'
  | 'culture'
  | 'sports'
  | 'health'
export interface Note {
  language: LanguageType
  category: CategoryType
  keyword: string
  created: number
  content: string
  industry: IndustryType
  mastered: Boolean
  hitCounter: number
  initId?: string
  updated?: Date
  id?: string
}
