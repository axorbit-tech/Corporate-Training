import React, { useState, useEffect } from "react";
import CounsellorCard from "./CounsellorCard";
import Loader from "../../common/Loader";
import SomethingWentWrong from "../../common/error";
import { useGetTrainersQuery } from "../../../store/slices/userApiSlice";
import Pagination from "../../pagination";

interface ICounsellor {
  _id: string;
  name: string;
  email: string;
  image: string;
  phone: string;
  profession: string;
  description: string;
}

const CounsellorProfileSection: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 6;

  const [counsellors, setCounsellors] = useState<ICounsellor[]>([]);

  const { data: trainerData, isLoading, error } = useGetTrainersQuery({
    page,
    limit,
  });

  const counsellorsList = trainerData?.data || [];
  const pagination = trainerData?.pagination;

  // ✅ Append new data when page changes
  useEffect(() => {
    if (counsellorsList.length) {
      setCounsellors((prev) => {
        const merged = page === 1 ? counsellorsList : [...prev, ...counsellorsList];
        return Array.from(new Map(merged.map((c: ICounsellor) => [c._id, c])).values()) as ICounsellor[];
      });
    }
  }, [counsellorsList, page]);

  if (isLoading && page === 1) return <Loader />;
  if (error) return <SomethingWentWrong />;
  if (!counsellors.length) return null;

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
          {counsellors.map((counsellor) => (
            <CounsellorCard
              key={counsellor._id}
              name={counsellor.name}
              profession={counsellor.profession}
              email={counsellor.email}
              aboutText={counsellor.description || abtText}
              image={counsellor.image}
            />
          ))}
        </div>

        {/* Load More */}
        {pagination && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.pages}
            onPageChange={setPage}
            onShowLess={() => {
              setPage(1);            // reset back to page 1
              setCounsellors(prev => prev.slice(0, 6)); // keep only first 6 counsellors
            }}
            variant="loadMore"
            isLoading={isLoading && page > 1}
          />
        )}
      </div>
    </section>
  );
};

export default CounsellorProfileSection;
