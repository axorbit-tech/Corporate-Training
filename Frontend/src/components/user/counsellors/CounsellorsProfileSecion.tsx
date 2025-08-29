import React, { useState, useEffect } from "react";
import CounsellorCard from "./CounsellorCard";
import Loader from "../../common/Loader";
import SomethingWentWrong from "../../common/error";
import { useGetTrainersQuery } from "../../../store/slices/userApiSlice";
import Pagination from "../../pagination";
import type { ITrainer } from "../../../types/types";

const CounsellorProfileSection: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data: trainerData, isLoading, error } = useGetTrainersQuery({
    page,
    limit,
  });

  const [counsellorsList, setCounsellorsList] = useState<ITrainer[]>([]);

  // ✅ Merge data when trainerData or page changes
  useEffect(() => {
    if (trainerData?.data) {
      setCounsellorsList((prev) => {
        if (page === 1) return trainerData.data;
        const merged = [...prev, ...trainerData.data];
        // ✅ Remove duplicates by _id
        return Array.from(new Map(merged.map((c) => [c._id, c])).values());
      });
    }
  }, [trainerData, page]);

  const pagination = trainerData?.pagination;

  if (isLoading && page === 1) return <Loader />;
  if (error) return <SomethingWentWrong />;

  const abtText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod...";

  return (
    <section className="counsellor-profile-section bg-gray-50 py-10 sm:py-20 lg:py-24 lg:px-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Meet Our Counsellors
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Our team of experienced professionals is dedicated to providing
            personalized care and support for your mental health and wellness
            journey.
          </p>
        </div>

        {/* Counsellors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {counsellorsList.map((counsellor) => (
            <CounsellorCard
              key={counsellor?._id || counsellor?.email} // ✅ fallback key
              name={counsellor?.name}
              profession={counsellor?.designation}
              email={counsellor?.email}
              aboutText={counsellor?.description?.trim() || abtText} // ✅ handle empty string
              image={counsellor?.image}
            />
          ))}
        </div>

        {/* Load More */}
        {pagination && pagination.pages > 1 && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.pages}
            onPageChange={setPage}
            onShowLess={() => setPage(1)} // ✅ reset to first page
            variant="loadMore"
            isLoading={isLoading && page > 1}
          />
        )}
      </div>
    </section>
  );
};

export default CounsellorProfileSection;
