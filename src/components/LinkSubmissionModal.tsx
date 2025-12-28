import React, { useState, useEffect } from "react";
import { SubmitTask } from "../api/user";
import { showToastSuccess, showToastWarning } from "../Toast";

interface LinkSubmissionModalProps {
  onClose: () => void;
  subdomain: string;
  tech: boolean;
  subcategory?: string | null; // Added prop to interface
}

const LinkSubmissionModal: React.FC<LinkSubmissionModalProps> = ({
  onClose,
  subdomain,
  tech,
  subcategory, // Added destructuring
}) => {
  const [githubLink, setGithubLink] = useState("");
  const [otherLinks, setOtherLinks] = useState("");

  useEffect(() => {
    const savedLinks = localStorage.getItem(`${subdomain}Task`);
    if (savedLinks) {
      const parsedLinks = JSON.parse(savedLinks);
      setGithubLink(parsedLinks.githubLink || "");
      setOtherLinks(parsedLinks.otherLinks || "");
    }
  }, [subdomain]);

  const handleSubmit = async () => {
    if (tech) {
      if (githubLink.trim() === "") {
        showToastWarning("Please provide a GitHub Link");
        return;
      }

const githubRepoRegex =
  /^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/[\w-]+(\/[\w-./]*)?\/?$/;


      if (!githubRepoRegex.test(githubLink.trim())) {
        showToastWarning("Please provide a valid GitHub repository link");
        return;
      }
    } else {
      if (otherLinks.trim() === "") {
        showToastWarning("Please provide at least one link");
        return;
      }
    }
    const linksArray: string[] = [];
    if (tech && githubLink.trim() !== "") {
      linksArray.push(githubLink.trim());
    }
    if (otherLinks.trim() !== "") {
      const separatedLinks = otherLinks
        .split(",")
        .map((link) => link.trim())
        .filter((link) => link !== "");
      linksArray.push(...separatedLinks);
    }
    try {
      // Passed subcategory to SubmitTask
      const response = await SubmitTask(2, subdomain, subcategory, linksArray);
      if (response.status === 200) {
        showToastSuccess("Task submitted successfully!");

        const linksToSave = {
          githubLink: tech ? githubLink.trim() : undefined,
          otherLinks: otherLinks.trim(),
        };
        localStorage.setItem(`${subdomain}Task`, JSON.stringify(linksToSave));
      } else if (response.status == 201) {
        showToastWarning("You did not attempt round 1");
      } else if (response.status == 202) {
        showToastWarning("You did not qualify round 1");
      } else {
        showToastWarning("Failed to submit task. Please try again.");
      }
    } catch (error) {
      showToastWarning("An error occurred while submitting the task.");
    }
    setGithubLink("");
    setOtherLinks("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 overflow-x-hidden bg-black bg-opacity-50 backdrop-blur-sm font-retro-gaming">
      {/* Responsive Modal Container */}
      <div className="w-11/12 sm:w-3/4 md:w-1/2 max-w-lg p-6 text-center bg-black border-2 border-white shadow-lg rounded-xl max-h-[90vh] overflow-y-auto">
        <h2 className="mb-4 text-xl font-bold md:text-2xl">
          Submit Task Links
        </h2>

        <div className="flex flex-col space-y-3">
          {tech && (
            <>
              <input
                type="text"
                placeholder="GitHub Link"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                className="p-2 text-white bg-transparent border border-white rounded-lg"
              />
              <p className="max-w-xs mx-auto text-sm text-gray-400 break-words sm:max-w-sm">
                Example:{" "}
                <a
                  href="https://github.com/username/repository"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline break-all"
                >
                  https://github.com/username/repository
                </a>
              </p>
            </>
          )}

          <textarea
            rows={4}
            placeholder={
              tech ? "Other Links (comma separated)" : "Links (comma separated)"
            }
            value={otherLinks}
            onChange={(e) => setOtherLinks(e.target.value)}
            className="p-2 text-white bg-transparent border border-white rounded-lg"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-4 space-x-3">
          <button
            className="px-4 py-2 text-white bg-green-500 rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkSubmissionModal;