export interface Quiz {
  question: string;
  options: string[];
  correct: number;
}

export interface SubLevel {
  id: string;
  title: string;
  tasks: string[];
  quiz?: Quiz[];
}

export interface Level {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: string;
  progress: number;
  locked: boolean;
  subLevels: SubLevel[];
}