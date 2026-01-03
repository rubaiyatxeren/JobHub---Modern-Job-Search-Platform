import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Award,
  Bookmark,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  DollarSign,
  ExternalLink,
  FileText,
  Globe,
  Heart,
  Linkedin,
  MapPin,
  Printer,
  Share2,
  Star,
  Tag,
  Users,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const JobDetailsModal = ({ isOpen, onClose, job, isSaved, onToggleSave }) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTags = () => {
    if (!job.tags) return [];
    if (Array.isArray(job.tags)) return job.tags.slice(0, 10);
    if (typeof job.tags === "string") {
      try {
        const parsed = JSON.parse(job.tags);
        return Array.isArray(parsed) ? parsed.slice(0, 10) : [parsed];
      } catch {
        return job.tags
          .split(/[,|;]/)
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
          .slice(0, 10);
      }
    }
    return [];
  };

  const tags = getTags();

  const generatePDF = async () => {
    if (!job) return;

    setIsGeneratingPDF(true);

    try {
      // Create a temporary div to capture the PDF content
      const pdfContent = document.createElement("div");
      pdfContent.style.position = "absolute";
      pdfContent.style.left = "-9999px";
      pdfContent.style.top = "0";
      pdfContent.style.width = "800px";
      pdfContent.style.padding = "40px";
      pdfContent.style.backgroundColor = "white";
      pdfContent.style.fontFamily = "Arial, sans-serif";

      pdfContent.innerHTML = `
          <div style="margin-bottom: 30px;">
            <h1 style="color: #1e40af; font-size: 28px; margin-bottom: 10px; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
              ${job.title || "Job Details"}
            </h1>
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
              <div style="display: flex; align-items: center; gap: 5px;">
                <span style="font-weight: bold; color: #4b5563;">Company:</span>
                <span>${job.company_name || "Unknown Company"}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 5px;">
                <span style="font-weight: bold; color: #4b5563;">Location:</span>
                <span>${
                  job.candidate_required_location || job.location || "Remote"
                }</span>
              </div>
            </div>
          </div>
  
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 30px;">
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <div style="font-size: 12px; color: #6b7280; margin-bottom: 5px;">Job Type</div>
              <div style="font-size: 16px; font-weight: bold; color: #1f2937;">${
                job.job_type || "Full-time"
              }</div>
            </div>
            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
              <div style="font-size: 12px; color: #6b7280; margin-bottom: 5px;">Salary</div>
              <div style="font-size: 16px; font-weight: bold; color: #1f2937;">${
                job.salary || "Competitive"
              }</div>
            </div>
            <div style="background: #faf5ff; padding: 15px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
              <div style="font-size: 12px; color: #6b7280; margin-bottom: 5px;">Posted</div>
              <div style="font-size: 16px; font-weight: bold; color: #1f2937;">${formatDate(
                job.publication_date
              )}</div>
            </div>
          </div>
  
          <div style="margin-bottom: 30px;">
            <h2 style="color: #1e40af; font-size: 22px; margin-bottom: 15px; border-bottom: 1px solid #d1d5db; padding-bottom: 5px;">Job Description</h2>
            <div style="color: #374151; line-height: 1.6; font-size: 14px;">
              ${
                job.description
                  ? job.description.replace(/<[^>]*>/g, "")
                  : "No description available."
              }
            </div>
          </div>
  
          <div style="display: flex; gap: 30px; margin-bottom: 30px;">
            <div style="flex: 1;">
              <h2 style="color: #1e40af; font-size: 20px; margin-bottom: 15px;">Requirements</h2>
              <div style="background: #fef2f2; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                <div style="font-size: 12px; color: #dc2626; margin-bottom: 5px;">Location Required</div>
                <div style="font-size: 14px; font-weight: bold; color: #1f2937;">${
                  job.candidate_required_location || "Anywhere"
                }</div>
              </div>
              <div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                <div style="font-size: 12px; color: #2563eb; margin-bottom: 5px;">Category</div>
                <div style="font-size: 14px; font-weight: bold; color: #1f2937;">${
                  job.category || "Not specified"
                }</div>
              </div>
            </div>
  
            <div style="flex: 1;">
              <h2 style="color: #1e40af; font-size: 20px; margin-bottom: 15px;">Skills Required</h2>
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${tags
                  .map(
                    (tag) => `
                  <span style="background: #e0e7ff; color: #3730a3; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;">
                    ${tag}
                  </span>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>
  
          ${
            job.benefits
              ? `
            <div style="margin-bottom: 30px;">
              <h2 style="color: #1e40af; font-size: 20px; margin-bottom: 15px;">Benefits & Perks</h2>
              <div style="background: #f0fdf4; padding: 20px; border-radius: 8px;">
                ${job.benefits
                  .split(",")
                  .map(
                    (benefit) => `
                  <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                    <span style="color: #10b981;">✓</span>
                    <span style="color: #374151; font-size: 14px;">${benefit.trim()}</span>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          `
              : ""
          }
  
          ${
            job.company_description
              ? `
            <div style="margin-bottom: 30px;">
              <h2 style="color: #1e40af; font-size: 20px; margin-bottom: 15px;">About the Company</h2>
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #4f46e5;">
                <div style="color: #374151; line-height: 1.6; font-size: 14px;">
                  ${job.company_description}
                </div>
              </div>
            </div>
          `
              : ""
          }
  
          <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
            <div>JobHub - Professional Job Portal</div>
            <div>Generated on ${new Date().toLocaleDateString()}</div>
            <div>Job URL: ${job.url || "Not available"}</div>
          </div>
        `;

      document.body.appendChild(pdfContent);

      const canvas = await html2canvas(pdfContent, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      document.body.removeChild(pdfContent);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setTextColor(150);
        pdf.text(
          `Page ${i} of ${totalPages}`,
          pdfWidth / 2,
          pdf.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
      }

      pdf.save(
        `${job.title?.replace(/[^a-z0-9]/gi, "_") || "job"}_${Date.now()}.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const printJobDetails = () => {
    const printContent = document.createElement("div");
    printContent.style.position = "absolute";
    printContent.style.left = "-9999px";
    printContent.style.top = "0";
    printContent.style.width = "800px";
    printContent.style.padding = "40px";
    printContent.style.backgroundColor = "white";

    printContent.innerHTML = `
        <div style="margin-bottom: 30px;">
          <h1 style="color: #1e40af; font-size: 28px; margin-bottom: 10px;">${
            job.title || "Job Details"
          }</h1>
          <div style="color: #4b5563; margin-bottom: 20px;">
            <strong>Company:</strong> ${
              job.company_name || "Unknown Company"
            }<br/>
            <strong>Location:</strong> ${
              job.candidate_required_location || job.location || "Remote"
            }<br/>
            <strong>Posted:</strong> ${formatDate(job.publication_date)}
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1e40af; font-size: 22px; margin-bottom: 15px;">Job Description</h2>
          <div>${
            job.description
              ? job.description.replace(/<[^>]*>/g, "")
              : "No description available."
          }</div>
        </div>
        
        ${
          job.benefits
            ? `
          <div style="margin-bottom: 30px;">
            <h2 style="color: #1e40af; font-size: 22px; margin-bottom: 15px;">Benefits</h2>
            <ul>
              ${job.benefits
                .split(",")
                .map((benefit) => `<li>${benefit.trim()}</li>`)
                .join("")}
            </ul>
          </div>
        `
            : ""
        }
        
        <div style="margin-top: 40px; color: #6b7280; font-size: 12px; text-align: center;">
          Printed from JobHub - ${new Date().toLocaleDateString()}
        </div>
      `;

    document.body.appendChild(printContent);

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
        <html>
          <head>
            <title>${job.title || "Job Details"}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; }
              @media print {
                body { padding: 0; }
              }
            </style>
          </head>
          <body>${printContent.innerHTML}</body>
        </html>
      `);
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
      document.body.removeChild(printContent);
    }, 250);
  };

  const shareJob = async () => {
    const jobUrl = job.url || window.location.href;
    const jobTitle = job.title || "Job Opportunity";
    const text = `Check out this job: ${jobTitle} at ${
      job.company_name || "a company"
    }`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: jobTitle,
          text: text,
          url: jobUrl,
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          copyToClipboard(jobUrl);
        }
      }
    } else {
      copyToClipboard(jobUrl);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => alert("Job link copied to clipboard!"),
      () => alert("Failed to copy link")
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-6xl max-h-[95vh] bg-white rounded-3xl shadow-2xl overflow-hidden mb-6">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-200 flex items-center justify-center">
                  {job.company_logo ? (
                    <img
                      src={job.company_logo}
                      alt={(job.company_name || "C").charAt(0).toUpperCase()}
                      className="w-8 h-8 object-contain text-center font-bold text-2xl"
                    />
                  ) : (
                    <span className="text-blue-600 font-bold text-lg">
                      {(job.company_name || "C").charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-gray-900 truncate">
                    {job.title || "Job Details"}
                  </h2>
                  <div className="flex items-center gap-3 text-gray-600 mt-1">
                    <div className="flex items-center gap-1.5">
                      <Building2 size={16} className="text-gray-400" />
                      <span className="font-medium">
                        {job.company_name || "Unknown Company"}
                      </span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={16} className="text-gray-400" />
                      <span>
                        {job.candidate_required_location ||
                          job.location ||
                          "Remote"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleSave(job.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                  isSaved
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {isSaved ? (
                  <>
                    <Check size={18} />
                    <span className="hidden sm:inline">Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark size={18} />
                    <span className="hidden sm:inline">Save Job</span>
                  </>
                )}
              </button>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-180px)]">
          <div className="px-8 py-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <Briefcase size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Job Type</p>
                    <p className="text-lg font-bold text-gray-900">
                      {job.job_type || "Full-time"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <DollarSign size={24} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Salary</p>
                    <p className="text-lg font-bold text-gray-900">
                      {job.salary || "Competitive"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <Calendar size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Posted</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatDate(job.publication_date)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Job Description
                </h3>
              </div>

              <div className="prose prose-lg max-w-none">
                {job.description ? (
                  <div
                    className="text-gray-700 leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  />
                ) : (
                  <p className="text-gray-500 italic">
                    No description available.
                  </p>
                )}
              </div>
            </div>

            {/* Requirements & Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Requirements */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <Users size={20} className="text-red-600" />
                  </div>
                  Requirements
                </h4>

                <div className="space-y-4">
                  {job.candidate_required_location && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl">
                      <Globe size={18} className="text-red-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Location Required
                        </p>
                        <p className="font-semibold text-gray-900">
                          {job.candidate_required_location}
                        </p>
                      </div>
                    </div>
                  )}

                  {job.category && (
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                      <Award
                        size={18}
                        className="text-blue-500 flex-shrink-0"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Category
                        </p>
                        <p className="font-semibold text-gray-900">
                          {job.category}
                        </p>
                      </div>
                    </div>
                  )}

                  {job.application_deadline && (
                    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
                      <Clock
                        size={18}
                        className="text-amber-500 flex-shrink-0"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Apply By
                        </p>
                        <p className="font-semibold text-gray-900">
                          {formatDate(job.application_deadline)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Skills & Tags */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <Tag size={20} className="text-indigo-600" />
                  </div>
                  Skills Required
                </h4>

                {tags.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2.5 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 rounded-xl text-sm font-semibold border border-indigo-100 hover:from-indigo-100 hover:to-blue-100 transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    No specific skills listed.
                  </p>
                )}

                {/* Benefits Section */}
                {job.benefits && (
                  <div className="mt-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                        <Heart size={20} className="text-green-600" />
                      </div>
                      Benefits & Perks
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {job.benefits.split(",").map(
                        (benefit, index) =>
                          benefit.trim() && (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
                            >
                              <CheckCircle
                                size={16}
                                className="text-green-500 flex-shrink-0"
                              />
                              <span className="text-gray-700 font-medium">
                                {benefit.trim()}
                              </span>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                About {job.company_name || "the Company"}
              </h4>
              {job.company_description ? (
                <p className="text-gray-700 leading-relaxed">
                  {job.company_description}
                </p>
              ) : (
                <p className="text-gray-500 italic">
                  No company description available.
                </p>
              )}
            </div>

            {/* Export & Share Options */}
            <div className="border-t border-gray-200 pt-8">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Export & Share
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <button
                  onClick={generatePDF}
                  disabled={isGeneratingPDF}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 text-blue-700 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingPDF ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <FileText size={18} />
                      <span>Save as PDF</span>
                    </>
                  )}
                </button>

                <button
                  onClick={printJobDetails}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 text-green-700 rounded-xl font-medium transition-all"
                >
                  <Printer size={18} />
                  <span>Print</span>
                </button>

                <button
                  onClick={shareJob}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl font-medium transition-all"
                >
                  <Share2 size={18} />
                  <span>Share</span>
                </button>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    job.url || window.location.href
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
              </div>

              <div className="mt-4 text-sm text-gray-500 text-center">
                <p>
                  Export this job to PDF for offline reading or easy sharing
                  with colleagues.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {job.remote && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full font-medium">
                  <Globe size={16} />
                  Remote Position
                </span>
              )}
              {job.urgent && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full font-medium">
                  <Star size={16} />
                  Urgent Hiring
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
              >
                Close
              </button>
              <a
                href={job.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Apply Now
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;

