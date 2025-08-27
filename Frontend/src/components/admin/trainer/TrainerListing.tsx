import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { Search, Filter, Trash2, Eye, Plus} from "lucide-react"
import type { ITrainer } from "../../../types/types"
import { generateAvatar } from "../../../utils/generateAvatar"
import { useGetTrainersQuery } from "../../../store/slices/apiSlice"
import { useNavigate } from "react-router-dom"
import Pagination from "../../pagination"

const TrainerListing: React.FC = () => {

  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const limit = 10

  const {data: trainersResponse, isLoading} = useGetTrainersQuery({page, limit})

  useEffect(()=> {
    setTrainers(trainersResponse?.data)
  }, [trainersResponse, page])

  const pagination = trainersResponse?.pagination


  const [trainers, setTrainers] = useState<ITrainer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTrainers, setSelectedTrainers] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Filter trainers based on search and designation
  const filteredTrainers = useMemo(() => {
    return trainers?.filter((trainer: ITrainer) => {
      const matchesSearch =
        trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trainer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trainer.designation.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })
  }, [trainers, searchTerm])


  const handleSelectAll = (checked: boolean) => {
    setSelectedTrainers(
      checked ? filteredTrainers?.map((trainer) => trainer._id) : []
    )
  }

  const handleSelectTrainer = (trainerId: number, checked: boolean) => {
    if (checked) {
      setSelectedTrainers([...selectedTrainers, trainerId])
    } else {
      setSelectedTrainers(selectedTrainers.filter((id) => id !== trainerId))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="admin-trainer-listing min-h-screen bg-gray-50">
      {/* Header */}
      <div className="admin-trainer-header bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="admin-trainer-page-title text-xl sm:text-2xl font-bold text-gray-900">Trainers</h1>
              <p className="admin-trainer-page-subtitle text-sm text-gray-600 hidden sm:block">
                Manage your training team and their profiles
              </p>
            </div>
            <button className="admin-add-trainer-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Trainer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="admin-trainer-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filters */}
        <div className="admin-trainer-controls bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="admin-search-container flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search trainers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-search-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="admin-filter-toggle px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Filter Options */}
          {/* {showFilters && (
            <div className="admin-filter-options mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="admin-filter-label block text-sm font-medium text-gray-700 mb-2">Designation</label>
                  <select
                    value={selectedDesignation}
                    onChange={(e) => setSelectedDesignation(e.target.value)}
                    className="admin-designation-select w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Designations</option>
                    {designations?.map((designation) => (
                      <option key={designation} value={designation}>
                        {designation}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )} */}
        </div>

        {/* Trainers Table - Desktop */}
        <div className="admin-trainer-table-container hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="admin-trainer-table w-full">
              <thead className="admin-table-header bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="admin-table-header-cell px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedTrainers?.length === filteredTrainers?.length && filteredTrainers?.length > 0
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="admin-select-all-checkbox rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="admin-table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trainer
                  </th>
                  <th className="admin-table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="admin-table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Designation
                  </th>
                  <th className="admin-table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="admin-table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="admin-table-header-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="admin-table-body bg-white divide-y divide-gray-200">
                {filteredTrainers?.map((trainer) => {
                  const avatar = generateAvatar(trainer.name)
                  return (
                    <tr key={trainer._id} className="admin-trainer-row hover:bg-gray-50">
                      <td className="admin-table-cell px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedTrainers.includes(trainer._id)}
                          onChange={(e) => handleSelectTrainer(trainer._id, e.target.checked)}
                          className="admin-trainer-checkbox rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="admin-table-cell px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`admin-trainer-avatar w-10 h-10 ${avatar.color} rounded-full flex items-center justify-center text-white font-medium text-sm`}
                          >
                            {avatar.initials}
                          </div>
                          <div>
                            <div className="admin-trainer-name text-sm font-medium text-gray-900">{trainer.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="admin-table-cell px-6 py-4">
                        <div className="admin-trainer-email text-sm text-gray-900">{trainer.email}</div>
                      </td>
                      <td className="admin-table-cell px-6 py-4">
                        <div className="admin-trainer-designation text-sm text-gray-900">{trainer.designation}</div>
                      </td>
                      <td className="admin-table-cell px-6 py-4">
                        <span
                          className={`admin-status-badge inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            trainer.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {trainer.status}
                        </span>
                      </td>
                      <td className="admin-table-cell px-6 py-4">
                        <div className="admin-trainer-date text-sm text-gray-900">{formatDate(trainer?.createdAt ?? "not found")}</div>
                      </td>
                      <td className="admin-table-cell px-6 py-4 text-right">
                        <div className="admin-trainer-actions flex items-center justify-end space-x-2">
                          <button onClick={()=> navigate(`/admin/trainer-details/${trainer._id}`)} className="admin-action-btn admin-view-btn p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="admin-action-btn admin-delete-btn p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trainers Cards - Mobile */}
        <div className="admin-trainer-cards lg:hidden space-y-4">
          {filteredTrainers?.map((trainer) => {
            const avatar = generateAvatar(trainer.name)
            return (
              <div key={trainer._id} className="admin-trainer-card bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedTrainers.includes(trainer._id)}
                      onChange={(e) => handleSelectTrainer(trainer._id, e.target.checked)}
                      className="admin-trainer-checkbox rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div
                      className={`admin-trainer-avatar w-12 h-12 ${avatar.color} rounded-full flex items-center justify-center text-white font-medium`}
                    >
                      {avatar.initials}
                    </div>
                    <div>
                      <h3 className="admin-trainer-name text-sm font-medium text-gray-900">{trainer.name}</h3>
                      <p className="admin-trainer-email text-sm text-gray-600">{trainer.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Designation:</span>
                    <span className="text-sm text-gray-900">{trainer.designation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Joined:</span>
                    <span className="text-sm text-gray-900">{formatDate(trainer.createdAt ?? "not found")}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button onClick={()=> navigate(`/admin/trainer-details/${trainer._id}`)} className="admin-view-btn flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button className="admin-delete-btn flex-1 px-3 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center justify-center space-x-1">
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Pagination */}
        {pagination && pagination.pages > 1 ? (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.pages}
            onPageChange={setPage}
            onShowLess={() => setPage(1)} // ✅ reset to first page
            isLoading={isLoading && page > 1}
          />
        ) : pagination ? (
          <div className="text-center text-gray-500 text-sm mt-5">
            <p>Page {pagination.page} of {pagination.pages}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default TrainerListing
