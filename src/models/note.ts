export type LanguageType = 'fr' | 'en'
export type CategoryType = 'word' | 'topic'
export type IndustryType = 'finance' | 'IT' | 'weather' | 'culture' |'sports'|'health'
export interface Note {
  language: LanguageType
  category: CategoryType
  keyword: string
  date: Date
  content: string
  industry: IndustryType
  mastered: Boolean
  id?: string
}
