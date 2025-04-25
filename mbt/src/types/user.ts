export interface User {
  id: any;
  username: string;
  avatar: string;
  level: number;
  completedLevels: number;
  friendCode: string;
  achievements: Achievement[];
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}