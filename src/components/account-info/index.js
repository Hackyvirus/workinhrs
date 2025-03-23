"use client";

import {
  candidateOnboardFormControls,
  initialCandidateAccountFormData,
  initialRecruiterFormData,
  recruiterOnboardFormControls,
} from "@/utils";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { updateProfileAction } from "@/actions";

function AccountInfo({ profileInfo }) {
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateAccountFormData
  );
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );

  useEffect(() => {
    if (profileInfo?.role === "recruiter")
      setRecruiterFormData(profileInfo?.recruiterInfo);

    if (profileInfo?.role === "candidate")
      setCandidateFormData(profileInfo?.candidateInfo);
  }, [profileInfo]);

  async function handleUpdateAccount() {
    await updateProfileAction(
      profileInfo?.role === "candidate"
        ? {
            _id: profileInfo?._id,
            userId: profileInfo?.userId,
            email: profileInfo?.email,
            role: profileInfo?.role,
            isPremiumUser: profileInfo?.isPremiumUser,
            memberShipType: profileInfo?.memberShipType,
            memberShipStartDate: profileInfo?.memberShipStartDate,
            memberShipEndDate: profileInfo?.memberShipEndDate,
            candidateInfo: {
              ...candidateFormData,
              resume: profileInfo?.candidateInfo?.resume,
            },
          }
        : {
            _id: profileInfo?._id,
            userId: profileInfo?.userId,
            email: profileInfo?.email,
            role: profileInfo?.role,
            isPremiumUser: profileInfo?.isPremiumUser,
            memberShipType: profileInfo?.memberShipType,
            memberShipStartDate: profileInfo?.memberShipStartDate,
            memberShipEndDate: profileInfo?.memberShipEndDate,
            recruiterInfo: {
              ...recruiterFormData,
            },
          },
      "/account"
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faecd2] to-white dark:from-[#1c3424] dark:to-gray-900 text-[#1c3424] dark:text-[#faecd2] flex flex-col">
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex-grow">
        {/* Header */}
        <div className="flex items-baseline justify-between pb-6 border-b border-gray-300 dark:border-gray-600 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-950 dark:text-white">
            Account Details
          </h1>
        </div>
        {/* Form Container */}
        <div className="py-20 pb-24 pt-6">
          <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 rounded-xl shadow-lg p-8">
            <CommonForm
              action={handleUpdateAccount}
              formControls={
                profileInfo?.role === "candidate"
                  ? candidateOnboardFormControls.filter(
                      (formControl) => formControl.name !== "resume"
                    )
                  : recruiterOnboardFormControls
              }
              formData={
                profileInfo?.role === "candidate"
                  ? candidateFormData
                  : recruiterFormData
              }
              setFormData={
                profileInfo?.role === "candidate"
                  ? setCandidateFormData
                  : setRecruiterFormData
              }
              buttonText="Update Profile"
            />
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="py-6 border-t border-gray-300 dark:border-gray-600 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default AccountInfo;
