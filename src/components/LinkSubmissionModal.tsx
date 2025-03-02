import React, { useState, useEffect } from "react";
import { SubmitTask } from "../api/user";
import { showToastSuccess, showToastWarning } from "../Toast"; // Ensure these are imported

interface LinkSubmissionModalProps {
  onClose: () => void;
  subdomain: string; // Add subdomain as a prop
}

const LinkSubmissionModal: React.FC<LinkSubmissionModalProps> = ({
  onClose,
  subdomain,
}) => {
  const [githubLink, setGithubLink] = useState("");
  const [otherLinks, setOtherLinks] = useState("");

  // Load saved links from localStorage when the modal is opened
  useEffect(() => {
    const savedLinks = localStorage.getItem(`${subdomain}Task`);
    if (savedLinks) {
      const parsedLinks = JSON.parse(savedLinks);
      setGithubLink(parsedLinks.githubLink || "");
      setOtherLinks(parsedLinks.otherLinks || "");
    }
  }, [subdomain]);

  const handleSubmit = async () => {
    if (githubLink.trim() === "" && otherLinks.trim() === "") {
      showToastWarning("Please provide at least one link."); // Replace alert with showToastWarning
      return;
    }

    const linksArray: string[] = [];

    if (githubLink.trim() !== "") {
      linksArray.push(githubLink.trim());
    }

    if (otherLinks.trim() !== "") {
      const separatedLinks = otherLinks
        .split(",")
        .map((link) => link.trim())
        .filter((link) => link !== "");
      linksArray.push(...separatedLinks);
    }

    const finalLinks = linksArray.map((link) => `${link}`);

    try {
      const response = await SubmitTask(2, subdomain, finalLinks);
      if (response.status === 200) {
        showToastSuccess("Task submitted successfully!"); // Replace alert with showToastSuccess

        // Save the links to localStorage
        const linksToSave = {
          githubLink: githubLink.trim(),
          otherLinks: otherLinks.trim(),
        };
        localStorage.setItem(`${subdomain}Task`, JSON.stringify(linksToSave));
      } else {
        showToastWarning("Failed to submit task. Please try again."); // Replace alert with showToastWarning
      }
    } catch (error) {
      console.error("Error submitting task:", error);
      showToastWarning("An error occurred while submitting the task."); // Replace alert with showToastWarning
    }

    setGithubLink("");
    setOtherLinks("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center font-retro-gaming">
      {/* Modal container with 50% width and 50% height */}
      <div className="bg-black p-6 rounded-xl shadow-lg text-center border-2 border-white w-1/2 h-1/2 flex flex-col justify-between">
        <h2 className="text-2xl font-bold mb-4">Submit Task Links</h2>
        <div className="flex flex-col space-y-4 flex-grow">
          <input
            type="text"
            placeholder="GitHub Link"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            className="p-2 rounded-lg border border-white bg-transparent text-white"
          />
          <textarea
            rows={4}
            placeholder="Other Links (comma separated)"
            value={otherLinks}
            onChange={(e) => setOtherLinks(e.target.value)}
            className="p-2 rounded-lg border border-white bg-transparent text-white"
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg mx-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg mx-2"
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
