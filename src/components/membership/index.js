"use client";

import { membershipPlans } from "@/utils";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import {
  createPriceIdAction,
  createStripePaymentAction,
  updateProfileAction,
} from "@/actions";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const stripePromise = loadStripe(
  "pk_test_51NMv6ZSC6E6fnyMeRIEb9oEXdGRCC9yrBTT4xWHgcjWOuFcqFiAHErvaS50K1hl5t5WJXVGfLLWxvb705IWJhA3300yCcrMnlM"
);

function Membership({ profileInfo }) {
  const pathName = useSearchParams();

  async function handlePayment(getCurrentPlan) {
    const stripe = await stripePromise;
    const extractPriceId = await createPriceIdAction({
      amount: Number(getCurrentPlan?.price),
    });

    if (extractPriceId) {
      sessionStorage.setItem("currentPlan", JSON.stringify(getCurrentPlan));
      const result = await createStripePaymentAction({
        lineItems: [
          {
            price: extractPriceId?.id,
            quantity: 1,
          },
        ],
      });

      console.log(result);

      await stripe.redirectToCheckout({
        sessionId: result?.id,
      });
    }

    console.log(extractPriceId);
  }

  async function updateProfile() {
    const fetchCurrentPlanFromSessionStorage = JSON.parse(
      sessionStorage.getItem("currentPlan")
    );

    await updateProfileAction(
      {
        ...profileInfo,
        isPremiumUser: true,
        memberShipType: fetchCurrentPlanFromSessionStorage?.type,
        memberShipStartDate: new Date().toString(),
        memberShipEndDate: new Date(
          new Date().getFullYear() +
            (fetchCurrentPlanFromSessionStorage?.type === "basic"
              ? 1
              : fetchCurrentPlanFromSessionStorage?.type === "teams"
              ? 2
              : 5),
          new Date().getMonth(),
          new Date().getDate()
        ).toString(),
      },
      "/membership"
    );
  }

  useEffect(() => {
    if (pathName.get("status") === "success") updateProfile();
  }, [pathName]);

  console.log(profileInfo);

  return (
    <div className="mx-auto max-w-7xl bg-[#faecd2] dark:bg-[#1c3424] min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-baseline justify-between border-b pb-6 pt-24 border-gray-300 dark:border-gray-600">
        <h1 className="text-4xl font-bold tracking-tight text-[#1c3424] dark:text-[#faecd2]">
          {profileInfo?.isPremiumUser
            ? "You are a premium user"
            : "Choose Your Best Plan"}
        </h1>
        <div>
          {profileInfo?.isPremiumUser ? (
            <Button className="flex h-11 items-center justify-center px-5 bg-[#a4c868] hover:bg-[#1c3424] text-white font-semibold rounded-md">
              {
                membershipPlans.find(
                  (planItem) => planItem.type === profileInfo?.memberShipType
                ).heading
              }
            </Button>
          ) : null}
        </div>
      </div>

      {/* Membership Plans */}
      <div className="py-20 pb-24 pt-6">
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {membershipPlans.map((plan, index) => (
              <CommonCard
                key={plan.type}
                icon={
                  <div className="flex justify-between items-center">
                    <JobIcon />
                    <h1 className="font-bold text-2xl text-[#1c3424] dark:text-[#faecd2]">
                      {plan.heading}
                    </h1>
                  </div>
                }
                title={`$ ${plan.price} /yr`}
                description={plan.type}
                footerContent={
                  // Display nothing if the user's current plan qualifies for no action
                  profileInfo?.memberShipType === "enterprise" ||
                  (profileInfo?.memberShipType === "basic" && index === 0) ||
                  (profileInfo?.memberShipType === "teams" &&
                    index >= 0 &&
                    index < 2) ? null : (
                    <Button
                      onClick={() => handlePayment(plan)}
                      className="flex h-11 items-center justify-center px-5 bg-[#a4c868] hover:bg-[#1c3424] text-white font-semibold rounded-md disabled:opacity-50"
                    >
                      {profileInfo?.memberShipType === "basic" ||
                      profileInfo?.memberShipType === "teams"
                        ? "Update Plan"
                        : "Get Premium"}
                    </Button>
                  )
                }
                className="bg-[#faecd2] dark:bg-[#1c3424] shadow-md rounded-lg p-6 transition-transform hover:scale-105"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;
