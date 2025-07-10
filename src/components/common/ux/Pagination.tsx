// components/Pagination.tsx
import type { ReactNode } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  size = 'md',
  className = ''
}: PaginationProps) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };

  const getVisiblePages = () => {
    const pages: number[] = [];
    const half = Math.floor(maxVisiblePages / 2);
    
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);
    
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const PageButton = ({ 
    page, 
    isActive = false, 
    disabled = false, 
    children 
  }: { 
    page?: number; 
    isActive?: boolean; 
    disabled?: boolean; 
    children: ReactNode 
  }) => (
    <button
      onClick={() => page && onPageChange(page)}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        border border-gray-300 font-medium transition-colors
        ${isActive 
          ? 'bg-blue-600 text-white border-blue-600' 
          : 'bg-white text-gray-700 hover:bg-gray-50'
        }
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:border-gray-400'
        }
        first:rounded-l-md last:rounded-r-md
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      `}
    >
      {children}
    </button>
  );

  const visiblePages = getVisiblePages();
  const showLeftEllipsis = visiblePages[0] > 1;
  const showRightEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

  return (
    <nav className={`flex items-center justify-center ${className}`}>
      <div className="flex -space-x-px">
        {/* First Page */}
        {showFirstLast && currentPage > 1 && (
          <PageButton page={1}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </PageButton>
        )}

        {/* Previous Page */}
        {showPrevNext && (
          <PageButton 
            page={currentPage - 1} 
            disabled={currentPage === 1}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </PageButton>
        )}

        {/* Left Ellipsis */}
        {showLeftEllipsis && (
          <span className={`${sizeClasses[size]} border border-gray-300 bg-white text-gray-500`}>
            ...
          </span>
        )}

        {/* Page Numbers */}
        {visiblePages.map(page => (
          <PageButton
            key={page}
            page={page}
            isActive={page === currentPage}
          >
            {page}
          </PageButton>
        ))}

        {/* Right Ellipsis */}
        {showRightEllipsis && (
          <span className={`${sizeClasses[size]} border border-gray-300 bg-white text-gray-500`}>
            ...
          </span>
        )}

        {/* Next Page */}
        {showPrevNext && (
          <PageButton 
            page={currentPage + 1} 
            disabled={currentPage === totalPages}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </PageButton>
        )}

        {/* Last Page */}
        {showFirstLast && currentPage < totalPages && (
          <PageButton page={totalPages}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </PageButton>
        )}
      </div>
    </nav>
  );
};

// Composant d'informations de pagination
interface PaginationInfoProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  className?: string;
}

export const PaginationInfo = ({
  currentPage,
//   totalPages,
  totalItems,
  itemsPerPage,
  className = ''
}: PaginationInfoProps) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`text-sm text-gray-700 ${className}`}>
      Affichage de {startItem} à {endItem} sur {totalItems} résultats
    </div>
  );
};

export default Pagination;