import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BlogFilterContextType {
  selectedTag: string | null;
  selectedCategory: string | null;
  setSelectedTag: (tag: string | null) => void;
  setSelectedCategory: (category: string | null) => void;
}

const BlogFilterContext = createContext<BlogFilterContextType | undefined>(undefined);

export const BlogFilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <BlogFilterContext.Provider value={{ selectedTag, selectedCategory, setSelectedTag, setSelectedCategory }}>
      {children}
    </BlogFilterContext.Provider>
  );
};

export const useBlogFilter = () => {
  const context = useContext(BlogFilterContext);
  if (context === undefined) {
    throw new Error('useBlogFilter must be used within a BlogFilterProvider');
  }
  return context;
};
