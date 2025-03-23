import HomeContent from "@/components/HomeContent";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchProfileAction } from "@/actions";

export default async function HomePage() {
  const user = await currentUser();
  const profileInfo = user ? await fetchProfileAction(user.id) : null;

  if (user && !profileInfo?._id) {
    redirect("/onboard");
  }

  const userPlain = user ? JSON.parse(JSON.stringify(user)) : null;
  const profileInfoPlain = profileInfo
    ? JSON.parse(JSON.stringify(profileInfo))
    : null;

  return (
    <div>
      <HomeContent user={userPlain} profileInfo={profileInfoPlain} />
    </div>
  );
}
