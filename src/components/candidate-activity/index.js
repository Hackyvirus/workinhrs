"use client";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

function CandidateActivity({ jobList, jobApplicants }) {
  console.log(jobList, jobApplicants);

  const uniqueStatusArray = [
    ...new Set(
      jobApplicants.map((jobApplicantItem) => jobApplicantItem.status).flat(1)
    ),
  ];

  console.log(uniqueStatusArray);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Tabs defaultValue="Applied" className="w-full">
        <div className="flex flex-col md:flex-row items-baseline justify-between border-b pb-6 pt-24 dark:border-gray-600">
          <h1 className="text-4xl font-bold tracking-tight text-[#1c3424] dark:text-[#faecd2]">
            Your Activity
          </h1>
          <TabsList className="mt-4 md:mt-0 flex flex-wrap gap-2">
            {uniqueStatusArray.map((status, idx) => (
              <TabsTrigger
                key={idx}
                value={status}
                className="px-4 py-2 rounded-md text-[#1c3424] dark:text-[#faecd2] bg-[#faecd2] dark:bg-[#1c3424] hover:bg-[#a4c868] dark:hover:bg-[#a4c868] transition-colors"
              >
                {status}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="py-12">
          <div className="space-y-8">
            {uniqueStatusArray.map((status, idx) => (
              <TabsContent key={idx} value={status}>
                <div className="flex flex-col gap-4">
                  {jobList
                    .filter((jobItem) =>
                      jobApplicants
                        .filter((jobApplication) =>
                          jobApplication.status.indexOf(status) > -1
                        )
                        .findIndex(
                          (filteredItemByStatus) =>
                            jobItem._id === filteredItemByStatus.jobID
                        ) > -1
                    )
                    .map((finalFilteredItem) => (
                      <CommonCard
                        key={finalFilteredItem._id}
                        icon={<JobIcon />}
                        title={finalFilteredItem?.title}
                        description={finalFilteredItem?.companyName}
                        className="bg-[#faecd2] dark:bg-[#1c3424] shadow-md rounded-lg p-4 transition-all hover:shadow-xl"
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  );
}

export default CandidateActivity;
