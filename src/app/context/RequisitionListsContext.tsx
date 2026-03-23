import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type RequisitionList = {
  id: string;
  name: string;
  notes: string;
  createdAt: string;
};

type RequisitionListsContextValue = {
  lists: RequisitionList[];
  createList: (name: string, notes: string) => void;
  removeList: (id: string) => void;
  renameList: (id: string, name: string) => void;
};

const RequisitionListsContext = createContext<RequisitionListsContextValue | undefined>(
  undefined
);

export function RequisitionListsProvider({ children }: { children: ReactNode }) {
  const [lists, setLists] = useState<RequisitionList[]>([]);

  const createList = useCallback((name: string, notes: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const entry: RequisitionList = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `list-${Date.now()}`,
      name: trimmed,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    };
    setLists((prev) => [entry, ...prev]);
  }, []);

  const removeList = useCallback((id: string) => {
    setLists((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const renameList = useCallback((id: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setLists((prev) => prev.map((l) => (l.id === id ? { ...l, name: trimmed } : l)));
  }, []);

  const value = useMemo(
    () => ({ lists, createList, removeList, renameList }),
    [lists, createList, removeList, renameList]
  );

  return (
    <RequisitionListsContext.Provider value={value}>{children}</RequisitionListsContext.Provider>
  );
}

export function useRequisitionLists() {
  const ctx = useContext(RequisitionListsContext);
  if (!ctx) {
    throw new Error('useRequisitionLists must be used within RequisitionListsProvider');
  }
  return ctx;
}
