import { create } from 'zustand';

interface GitHubState {
  repositories: any[];
  starred: any[];
  selectedRepo: any | null;
  setRepositories: (repos: any[]) => void;
  setStarred: (repos: any[]) => void;
  setSelectedRepo: (repo: any) => void;
}

export const useGitHubStore = create<GitHubState>((set) => ({
  repositories: [],
  starred: [],
  selectedRepo: null,
  setRepositories: (repos) => set({ repositories: repos }),
  setStarred: (repos) => set({ starred: repos }),
  setSelectedRepo: (repo) => set({ selectedRepo: repo }),
}));
