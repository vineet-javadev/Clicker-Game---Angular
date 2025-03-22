import { signal } from "@angular/core";

export const userFromDB = localStorage.getItem('clickerdb');
export const defaultUser = { name: 'John Deo', easyscore: 989779, mediumscore: 78787, hardscore: 578 };
export var user = signal(userFromDB ? JSON.parse(userFromDB) : defaultUser);

export interface User {
  name: string;
  easyscore: number;
  mediumscore: number;
  hardscore: number;
}