"use client";

import { filterMenuDataArray, formUrlQuery } from "@/utils";
import CandidateJobCard from "../candidate-job-card";
import PostNewJob from "../post-new-job";
import RecruiterJobCard from "../recruiter-job-card";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function JobListing({ user, profileInfo, jobList, jobApplications, filterCategories }) {
  const [filterParams, setFilterParams] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleFilter(getSectionID, getCurrentOption) {
    let cpyFilterParams = { ...filterParams };
    const indexOfCurrentSection = Object.keys(cpyFilterParams).indexOf(getSectionID);
    if (indexOfCurrentSection === -1) {
      cpyFilterParams = {
        ...cpyFilterParams,
        [getSectionID]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption = cpyFilterParams[getSectionID].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1)
        cpyFilterParams[getSectionID].push(getCurrentOption);
      else cpyFilterParams[getSectionID].splice(indexOfCurrentOption, 1);
    }
    setFilterParams(cpyFilterParams);
    sessionStorage.setItem("filterParams", JSON.stringify(cpyFilterParams));
  }

  useEffect(() => {
    const storedParams = sessionStorage.getItem("filterParams");
    if (storedParams) {
      setFilterParams(JSON.parse(storedParams));
    }
  }, []);

  useEffect(() => {
    if (filterParams && Object.keys(filterParams).length > 0) {
      const url = formUrlQuery({
        params: searchParams.toString(),
        dataToAdd: filterParams,
      });
      router.push(url, { scroll: false });
    }
  }, [filterParams, searchParams]);

  const filterMenus = filterMenuDataArray.map((item) => ({
    id: item.id,
    name: item.label,
    options: [...new Set(filterCategories.map((listItem) => listItem[item.id]))],
  }));

  return (
    <div className="bg-[#faecd2] dark:bg-[#1c3424] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="py-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 className="text-4xl font-extrabold text-[#1c3424] dark:text-[#faecd2]">
              {profileInfo?.role === "candidate" ? "Explore All Jobs" : "Jobs Dashboard"}
            </h1>
            <div className="mt-4 md:mt-0">
              {profileInfo?.role === "candidate" ? (
                <Menubar>
                  {filterMenus.map((filterMenu, index) => (
                    <MenubarMenu key={index}>
                      <MenubarTrigger className="bg-[#faecd2] dark:bg-[#1c3424] text-[#1c3424] dark:text-[#faecd2] px-4 py-2 rounded-md shadow hover:bg-[#a4c868] hover:text-white transition-colors">
                        {filterMenu.name}
                      </MenubarTrigger>
                      <MenubarContent className="bg-[#faecd2] dark:bg-[#1c3424]">
                        {filterMenu.options.map((option, optionIdx) => (
                          <MenubarItem
                            key={optionIdx}
                            className="flex items-center hover:bg-[#a4c868] hover:text-white p-2 transition-colors"
                            onClick={() => handleFilter(filterMenu.id, option)}
                          >
                            <div
                              className={`h-4 w-4 border rounded border-gray-400 mr-2 flex-shrink-0 ${
                                filterParams &&
                                Object.keys(filterParams).length > 0 &&
                                filterParams[filterMenu.id] &&
                                filterParams[filterMenu.id].indexOf(option) > -1
                                  ? "bg-[#1c3424] dark:bg-[#faecd2]"
                                  : ""
                              }`}
                            />
                            <Label className="cursor-pointer text-sm text-[#1c3424] dark:text-[#faecd2]">
                              {option}
                            </Label>
                          </MenubarItem>
                        ))}
                      </MenubarContent>
                    </MenubarMenu>
                  ))}
                </Menubar>
              ) : (
                <PostNewJob jobList={jobList} user={user} profileInfo={profileInfo} />
              )}
            </div>
          </div>
        </header>
        <main className="pb-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {jobList && jobList.length > 0 ? (
              jobList.map((jobItem, idx) =>
                profileInfo?.role === "candidate" ? (
                  <CandidateJobCard
                    key={idx}
                    profileInfo={profileInfo}
                    jobItem={jobItem}
                    jobApplications={jobApplications}
                  />
                ) : (
                  <RecruiterJobCard
                    key={idx}
                    profileInfo={profileInfo}
                    jobItem={jobItem}
                    jobApplications={jobApplications}
                  />
                )
              )
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-300 col-span-full">
                No jobs available at the moment.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default JobListing;
