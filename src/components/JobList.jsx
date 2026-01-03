import { Briefcase } from "lucide-react";
import React, { useMemo } from "react";
import { useJobs } from "../context/JobContext";
import useFetchJobs from "../hooks/useFetchJobs";
import JobCard from "./JobCard";

const JobList = ({ savedJobs, onToggleSave }) => {
  const { jobs, loading } = useJobs();

  useFetchJobs();

  const savedJobsSet = useMemo(() => new Set(savedJobs), [savedJobs]);

  if (loading) {
    return (
      <div
        className="flex justify-center items-center py-20"
        role="status"
        aria-label="Loading jobs"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-20">
        <Briefcase
          size={64}
          className="mx-auto text-gray-300 mb-4"
          aria-hidden="true"
        />
        <h3 className="text-2xl font-bold text-gray-700 mb-2">No jobs found</h3>
        <p className="text-gray-500">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isSaved={savedJobsSet.has(job.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
};

export default JobList;
