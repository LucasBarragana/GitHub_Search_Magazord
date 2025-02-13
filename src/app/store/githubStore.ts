import { create } from 'zustand';

type Repository = {
  id: number;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  language: string | null;
  created_at: string;
};

type GitHubStore = {
  username: string;
  repositories: Repository[];
  starredRepositories: Repository[];
  selectedRepo: Repository | null;
  setUsername: (username: string) => void;
  setRepositories: (repos: Repository[]) => void;
  setStarredRepositories: (repos: Repository[]) => void;
  setSelectedRepo: (repo: Repository | null) => void;
};

export const useGitHubStore = create<GitHubStore>((set) => ({
  username: '',
  repositories: [],
  starredRepositories: [],
  selectedRepo: null,
  setUsername: (username: string) => set(() => ({ username })),
  setRepositories: (repos: Repository[]) => set(() => ({ repositories: repos })),
  setStarredRepositories: (repos: Repository[]) => set(() => ({ starredRepositories: repos })),
  setSelectedRepo: (repo: Repository | null) => set(() => ({ selectedRepo: repo })),
}));
