import React, { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import JobList from "./components/JobList";
import SavedJobsPage from "./components/SavedJobsPage";
import SearchBar from "./components/SearchBar";
import { JobProvider } from "./context/JobContext";
import useFetchJobs from "./hooks/useFetchJobs";

const JobAppContent = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      const saved = localStorage.getItem("savedJobs");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Now this works because JobAppContent is inside JobProvider
  useFetchJobs();

  const handleNavigate = useCallback((page) => {
    setCurrentPage(page);
    window.history.pushState({}, "", `/${page}`);
  }, []);

  const handleToggleSave = useCallback((jobId) => {
    setSavedJobs((prev) => {
      const newSaved = prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId];

      try {
        localStorage.setItem("savedJobs", JSON.stringify(newSaved));
      } catch (error) {
        console.error("Failed to save to localStorage:", error);
      }

      return newSaved;
    });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.slice(1) || "home";
      setCurrentPage(path);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="container mx-auto px-4 py-8">
        {currentPage === "home" && (
          <>
            <SearchBar />
            <JobList savedJobs={savedJobs} onToggleSave={handleToggleSave} />
          </>
        )}

        {currentPage === "saved" && (
          <SavedJobsPage
            savedJobs={savedJobs}
            onToggleSave={handleToggleSave}
          />
        )}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <JobProvider>
      <JobAppContent />
    </JobProvider>
  );
};

export default App;
