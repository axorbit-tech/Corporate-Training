import type React from "react"
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    className?: string
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, className = "" }) => {
    if (totalPages <= 1) {
        return null
    }

    return (
        <div className={`flex items-center justify-center gap-4 mt-8 pt-6 pb-6 border-t border-gray-200 ${className}`}>
            <button
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
            >
                <ArrowLeftIcon className="h-4 w-4" />
                Previous
            </button>

            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                    Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
                    <strong className="text-gray-900">{totalPages}</strong>
                </span>
            </div>

            <button
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
            >
                Next
                <ArrowRightIcon className="h-4 w-4" />
            </button>
        </div>
    )
}

export default Pagination
