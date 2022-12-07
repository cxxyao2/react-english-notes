import { Note } from 'models/note'
import { Stats } from 'models/stats'

// 6 columns
export const initNavbarData: Stats[] = [
  { name: 'Culture', mastered: 0, unmastered: 0 },
  { name: 'Weather', mastered: 0, unmastered: 0 },
  { name: 'Health', mastered: 0, unmastered: 0 },
  { name: 'Sports', mastered: 0, unmastered: 0 },
  { name: 'Finance', mastered: 0, unmastered: 0 },
  { name: 'IT', mastered: 0, unmastered: 0 }
]

// 3 cards
export const initCardData: Note[] = [
  {
    language: 'en',
    category: 'word',
    keyword: 'jubiliation',
    created: new Date().getTime(),
    content:
      'Historic scenes of jubiliation in Kherson following the city"s liberation from Russia occupation.',
    industry: 'IT',
    mastered: false,
    hitCounter: 11
  },
  {
    language: 'en',
    category: 'word',
    keyword: 'migrate',
    created: new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      1
    ).getTime(),
    content: 'Where are they migrating to?',
    industry: 'IT',
    mastered: false,
    hitCounter: 11
  },
  {
    language: 'en',
    category: 'word',
    keyword: 'Ukraine',
    created: new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 2,
      1
    ).getTime(),
    content: 'Business Ukraine magazine is an independent quarterly journal.',
    industry: 'IT',
    mastered: false,
    hitCounter: 11
  }
]

// 2 topics
export const initTopicData: Note[] = [
  {
    language: 'en',
    category: 'word',
    keyword: 'jubiliation',
    created: new Date().getTime(),
    content:
      'Historic scenes of jubiliation in Kherson following the city"s liberation from Russia occupation.',
    industry: 'IT',
    mastered: false,
    hitCounter: 11
  },
  {
    language: 'en',
    category: 'word',
    keyword: 'migrate',
    created: new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      1
    ).getTime(),
    content: 'Where are they migrating to?',
    industry: 'IT',
    mastered: false,
    hitCounter: 11
  }
]
