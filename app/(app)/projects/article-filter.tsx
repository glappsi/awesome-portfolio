'use client';

import { Tool } from '@/actions/entities/models/tool';
import { Devicons } from '../components/devicons';
import { create } from 'zustand';

export type ArticleFilterStoreState = {
  selection?: string;
  select: (selection?: string) => void;
};

export const useArticleFilterStore = create<ArticleFilterStoreState>((set) => ({
  selection: undefined,
  select: (selection?: string) => set(() => ({ selection })),
}));

type Props = {
  tools: Array<Tool>;
};

export const ArticleToolFilter: React.FC<Props> = ({ tools }) => {
  const selection = useArticleFilterStore((state) => state.selection);
  const select = useArticleFilterStore((state) => state.select);

  return (
    <div className='flex gap-4 overflow-auto'>
      <Devicons
        tools={tools}
        value={selection}
        size='xl'
        onClick={(name) =>
          name === selection ? select(undefined) : select(name)
        }
        asCard
      />
    </div>
  );
};
