import {
  Bookmark,
  Briefcase,
  Building2,
  Calendar,
  Check,
  ChevronRight,
  DollarSign,
  ExternalLink,
  Globe,
  MapPin,
  Sparkles,
} from "lucide-react";
import React, { useState } from "react";
import JobDetailsModal from "./JobDetailsModal";

const JobCard = ({ job, isSaved, onToggleSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Format date for time ago
  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Recently";

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
    return `${Math.floor(diffDays / 365)}y ago`;
  };

  // Get location
  const location =
    job.candidate_required_location || job.location || job.country || "Remote";

  // Get category
  const category =
    job.category || job.job_type?.replace(/_/g, " ") || "Full-time";

  // Get tags
  const getTags = () => {
    if (!job.tags) return [];

    if (Array.isArray(job.tags)) {
      return job.tags.slice(0, 4);
    }

    if (typeof job.tags === "string") {
      try {
        const parsed = JSON.parse(job.tags);
        return Array.isArray(parsed) ? parsed.slice(0, 4) : [parsed];
      } catch {
        return job.tags
          .split(/[,|;]/)
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
          .slice(0, 4);
      }
    }

    return [];
  };

  const tags = getTags();
  const timeAgo = formatTimeAgo(job.publication_date);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 group">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              {/* Company Logo */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-200 flex items-center justify-center p-2">
                  {job.company_logo ? (
                    <img
                      src={job.company_logo}
                      alt={job.company_name || "Company"}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML = `
                            <span class="text-blue-600 font-bold text-xl">
                              ${(job.company_name || "C")
                                .charAt(0)
                                .toUpperCase()}
                            </span>
                          `;
                      }}
                    />
                  ) : (
                    <span className="text-blue-600 font-bold text-xl">
                      {(job.company_name || "C").charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>

              {/* Job Title & Company */}
              <div>
                <h3
                  className="text-xl font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2"
                  onClick={() => setIsModalOpen(true)}
                >
                  {job.title || "Untitled Position"}
                </h3>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Building2 size={16} className="text-gray-400" />
                  <span className="font-medium">
                    {job.company_name || "Unknown Company"}
                  </span>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(job.id);
              }}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors group/save"
              aria-label={isSaved ? "Unsave job" : "Save job"}
            >
              {isSaved ? (
                <Check size={20} className="text-blue-600" />
              ) : (
                <Bookmark
                  size={20}
                  className="text-gray-400 group-hover/save:text-blue-500"
                />
              )}
            </button>
          </div>

          {/* Job Details */}
          <div className="flex flex-wrap gap-3 mb-4">
            {/* Location */}
            <div className="inline-flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
              <MapPin size={14} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {location}
              </span>
            </div>

            {/* Job Type */}
            <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
              <Briefcase size={14} className="text-blue-500" />
              <span className="text-sm font-medium text-blue-700">
                {category}
              </span>
            </div>

            {/* Time */}
            <div className="inline-flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
              <Calendar size={14} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {timeAgo}
              </span>
            </div>

            {/* Salary */}
            {job.salary && (
              <div className="inline-flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                <DollarSign size={14} className="text-green-500" />
                <span className="text-sm font-medium text-green-700">
                  {job.salary}
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors"
                  >
                    {typeof tag === "string" ? tag.toLowerCase() : tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description Preview */}
          <p
            className="text-gray-600 mb-6 line-clamp-3 leading-relaxed cursor-pointer hover:text-gray-700 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            {job.description
              ? job.description.replace(/<[^>]*>/g, "").slice(0, 180) + "..."
              : "No description available"}
          </p>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-gray-100">
            <div className="flex items-center gap-3">
              {job.remote && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                  <Globe size={12} />
                  Remote
                </span>
              )}
              {job.urgent && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                  <Sparkles size={12} />
                  Urgent
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 text-blue-600 hover:text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                View Details
                <ChevronRight size={16} />
              </button>
              <a
                href={job.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all"
              >
                Apply Now
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <JobDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={job}
        isSaved={isSaved}
        onToggleSave={onToggleSave}
      />
    </>
  );
};

export default JobCard;
