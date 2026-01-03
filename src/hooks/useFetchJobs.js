import { useCallback, useEffect } from "react";
import { useJobs } from "../context/JobContext";
import useDebounce from "./useDebounce";

const API_URL = "https://remotive.com/api/remote-jobs?limit=100";

const useFetchJobs = () => {
  const { setJobs, setLoading, filters } = useJobs();
  const debouncedSearch = useDebounce(filters.search, 500);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data.jobs) {
        throw new Error("Invalid API response structure");
      }

      let filtered = data.jobs;

      if (debouncedSearch) {
        const searchTerm = debouncedSearch.toLowerCase();
        filtered = filtered.filter(
          (job) =>
            (job.title && job.title.toLowerCase().includes(searchTerm)) ||
            (job.company_name &&
              job.company_name.toLowerCase().includes(searchTerm))
        );
      }

      if (filters.location) {
        const locationTerm = filters.location.toLowerCase();
        filtered = filtered.filter(
          (job) =>
            job.candidate_required_location &&
            job.candidate_required_location.toLowerCase().includes(locationTerm)
        );
      }

      if (filters.type !== "all") {
        const typeTerm = filters.type.toLowerCase();
        filtered = filtered.filter(
          (job) => job.job_type && job.job_type.toLowerCase().includes(typeTerm)
        );
      }

      setJobs(filtered);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filters.location, filters.type, setJobs, setLoading]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { fetchJobs };
};

export default useFetchJobs;
