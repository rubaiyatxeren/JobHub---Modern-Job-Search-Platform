import { Briefcase } from "lucide-react";
import React, { useMemo } from "react";
import { useJobs } from "../context/JobContext";
import JobCard from "./JobCard";

const SavedJobsPage = ({ savedJobs, onToggleSave }) => {
  const { jobs } = useJobs();

  const saved = useMemo(
    () => jobs.filter((job) => savedJobs.includes(job.id)),
    [jobs, savedJobs]
  );

  if (saved.length === 0) {
    return (
      <div className="text-center py-20">
        <Briefcase
          size={64}
          className="mx-auto text-gray-300 mb-4"
          aria-hidden="true"
        />
        <h3 className="text-2xl font-bold text-gray-700 mb-2">
          No saved jobs yet
        </h3>
        <p className="text-gray-500">Start saving jobs to view them here</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {saved.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isSaved={true}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
};

export default SavedJobsPage;
