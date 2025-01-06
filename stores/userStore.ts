import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type User = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	roles: string[];
};

export type UserStore = {
	user: User | null;
	setUser: (user: User) => void;
	clearUser: () => void;
};

export const useUserStore = create(
	devtools<UserStore>((set) => ({
		user: null,
		setUser: (user) => set({ user }),
		clearUser: () => set({ user: null })
	}))
);
