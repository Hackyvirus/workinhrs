"use client";

import { useRouter } from "next/navigation";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";

function Companies({ jobsList }) {
  const router = useRouter();

  const createUniqueSetOfCompanies = [
    ...new Set(
      jobsList
        .filter(
          (jobItem) =>
            jobItem?.companyName && jobItem?.companyName.trim() !== ""
        )
        .map((item) => item.companyName)
    ),
  ];

  function handleFilterJobsByCompanyName(getCompanyName) {
    sessionStorage.setItem(
      "filterParams",
      JSON.stringify({
        companyName: [getCompanyName],
      })
    );
    router.push("/jobs");
  }

  return (
    <div className="mx-auto max-w-7xl bg-[#faecd2] dark:bg-[#1c3424] min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline dark:border-gray-600 justify-between border-b pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-[#1c3424] dark:text-[#faecd2]">
          Browse Companies
        </h1>
      </div>
      <div className="pt-6 pb-24">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
          <div className="lg:col-span-4">
            <div className="container mx-auto p-0 space-y-8">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                {createUniqueSetOfCompanies && createUniqueSetOfCompanies.length > 0 ? (
                  createUniqueSetOfCompanies.map((companyName, idx) => (
                    <CommonCard
                      key={idx}
                      icon={<JobIcon />}
                      title={companyName}
                      footerContent={
                        <Button
                          onClick={() => handleFilterJobsByCompanyName(companyName)}
                          className="h-11 flex items-center justify-center px-5 bg-[#a4c868] hover:bg-[#1c3424] text-white font-semibold rounded-md transition-colors"
                        >
                          See Jobs
                        </Button>
                      }
                      className="bg-[#faecd2] dark:bg-[#1c3424] shadow-md rounded-lg p-6 transition-transform hover:scale-105"
                    />
                  ))
                ) : (
                  <h1 className="text-center text-gray-600 dark:text-gray-300">
                    No Companies present!
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Companies;
