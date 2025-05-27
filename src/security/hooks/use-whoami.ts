import { whoamiCache } from '@/common/utils/whoami-cache';

export const useWhoami = () => {
  // return whoamiCache.get();
  const mockUser = {
    id: '37697438-8bee-4d85',
    githubId: '1633897518',
    email: null,
    name: 'John Doe',
    createdAt: '2025-05-19T12:33:38.579Z',
    updatedAt: '2025-05-19T12:33:38.579Z',
    deletedAt: null,
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MLTgyALK90h3uPAeLItgkFeag0Fgg0x4oWHWyTgVdd0',
  };

  return mockUser;
};
