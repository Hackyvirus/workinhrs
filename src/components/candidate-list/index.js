"use client";

import { Fragment } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  getCandidateDetailsByIDAction,
  updateJobApplicationAction,
} from "@/actions";
import { createClient } from "@supabase/supabase-js";

// Initialize your Supabase client
const supabaseClient = createClient(
  "https://jcojoxwralvqdfykmazc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impjb2pveHdyYWx2cWRmeWttYXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MDcyMzEsImV4cCI6MjA1ODI4MzIzMX0.Isjlx6lMdK6swVG23rjUeBY_cafuMCkH6A_a23bfCVs"
);

function CandidateList({
  jobApplications,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
}) {
  async function handleFetchCandidateDetails(getCurrentCandidateId) {
    const data = await getCandidateDetailsByIDAction(getCurrentCandidateId);
    if (data) {
      setCurrentCandidateDetails(data);
      setShowCurrentCandidateDetailsModal(true);
    }
  }

  console.log(currentCandidateDetails);

  // Use a signed URL to download the resume file
  async function handlePreviewResume() {
    const resumePath = currentCandidateDetails?.candidateInfo?.resume;
    if (!resumePath) {
      console.error("No resume path found.");
      return;
    }

    const { data, error } = await supabaseClient.storage
      .from("workinhrs")
      .createSignedUrl(resumePath, 3600); // URL valid for 1 hour

    if (error) {
      console.error("Error creating signed URL:", error);
      return;
    }

    const a = document.createElement("a");
    a.href = data.signedUrl;
    a.setAttribute("download", "Resume.pdf");
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function handleUpdateJobStatus(getCurrentStatus) {
    let cpyJobApplicants = [...jobApplications];
    const indexOfCurrentJobApplicant = cpyJobApplicants.findIndex(
      (item) => item.candidateUserID === currentCandidateDetails?.userId
    );

    if (indexOfCurrentJobApplicant === -1) return;

    const jobApplicantsToUpdate = {
      ...cpyJobApplicants[indexOfCurrentJobApplicant],
      status: cpyJobApplicants[indexOfCurrentJobApplicant].status.concat(
        getCurrentStatus
      ),
    };

    console.log(jobApplicantsToUpdate, "jobApplicantsToUpdate");
    await updateJobApplicationAction(jobApplicantsToUpdate, "/jobs");
  }

  console.log(jobApplications);

  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
        {jobApplications && jobApplications.length > 0
          ? jobApplications.map((jobApplicantItem) => (
              <div
                key={jobApplicantItem.candidateUserID}
                className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4"
              >
                <div className="px-4 my-6 flex justify-between items-center">
                  <h3 className="text-lg font-bold dark:text-black">
                    {jobApplicantItem?.name}
                  </h3>
                  <Button
                    onClick={() =>
                      handleFetchCandidateDetails(jobApplicantItem?.candidateUserID)
                    }
                    className="dark:bg-[#fffa27] flex h-11 items-center justify-center px-5"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))
          : null}
      </div>
      <Dialog
        open={showCurrentCandidateDetailsModal}
        onOpenChange={() => {
          setCurrentCandidateDetails(null);
          setShowCurrentCandidateDetailsModal(false);
        }}
      >
        <DialogContent>
          <div>
            <h1 className="text-2xl font-bold dark:text-white text-black">
              {currentCandidateDetails?.candidateInfo?.name},{" "}
              {currentCandidateDetails?.email}
            </h1>
            <p className="text-xl font-medium dark:text-white text-black">
              {currentCandidateDetails?.candidateInfo?.currentCompany}
            </p>
            <p className="text-sm font-normal dark:text-white text-black">
              {currentCandidateDetails?.candidateInfo?.currentJobLocation}
            </p>
            <p className="dark:text-white">
              Total Experience:{" "}
              {currentCandidateDetails?.candidateInfo?.totalExperience} Years
            </p>
            <p className="dark:text-white">
              Salary: {currentCandidateDetails?.candidateInfo?.currentSalary} LPA
            </p>
            <p className="dark:text-white">
              Notice Period: {currentCandidateDetails?.candidateInfo?.noticePeriod} Days
            </p>
            <div className="flex items-center gap-4 mt-6">
              <h1 className="dark:text-white">Previous Companies</h1>
              <div className="flex flex-wrap items-center gap-4 mt-6">
                {(currentCandidateDetails?.candidateInfo?.previousCompanies || "")
                  .split(",")
                  .map((company, idx) => (
                    <div
                      key={idx}
                      className="w-[100px] dark:bg-white flex justify-center items-center h-[35px] bg-black rounded-[4px]"
                    >
                      <h2 className="text-[13px] dark:text-black font-medium text-white">
                        {company.trim()}
                      </h2>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              {(currentCandidateDetails?.candidateInfo?.skills || "")
                .split(",")
                .map((skill, idx) => (
                  <div
                    key={idx}
                    className="w-[100px] dark:bg-white flex justify-center items-center h-[35px] bg-black rounded-[4px]"
                  >
                    <h2 className="text-[13px] dark:text-black font-medium text-white">
                      {skill.trim()}
                    </h2>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button
              onClick={handlePreviewResume}
              className="flex h-11 items-center justify-center px-5"
            >
              Resume
            </Button>
            <Button
              onClick={() => handleUpdateJobStatus("selected")}
              className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
              disabled={
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("selected") ||
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("rejected")
              }
            >
              {jobApplications.find(
                (item) =>
                  item.candidateUserID === currentCandidateDetails?.userId
              )?.status.includes("selected")
                ? "Selected"
                : "Select"}
            </Button>
            <Button
              onClick={() => handleUpdateJobStatus("rejected")}
              className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
              disabled={
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("selected") ||
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("rejected")
              }
            >
              {jobApplications.find(
                (item) =>
                  item.candidateUserID === currentCandidateDetails?.userId
              )?.status.includes("rejected")
                ? "Rejected"
                : "Reject"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default CandidateList;
