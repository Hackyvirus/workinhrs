"use client";

import { Fragment, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { CirclePlus, Heart } from "lucide-react";
import { Input } from "../ui/input";
import { createClient } from "@supabase/supabase-js";
import { createFeedPostAction, updateFeedPostAction } from "@/actions";

const supabaseClient = createClient(
  "https://jcojoxwralvqdfykmazc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impjb2pveHdyYWx2cWRmeWttYXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MDcyMzEsImV4cCI6MjA1ODI4MzIzMX0.Isjlx6lMdK6swVG23rjUeBY_cafuMCkH6A_a23bfCVs"
);

function Feed({ user, profileInfo, allFeedPosts }) {
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
    imageURL: "",
  });
  const [imageData, setImageData] = useState(null);

  function handleFileOnChange(event) {
    event.preventDefault();
    setImageData(event.target.files[0]);
  }

  function handleFetchImagePublicUrl(getData) {
    const { data } = supabaseClient.storage
      .from("workinhrs")
      .getPublicUrl(getData.path);

    if (data) {
      setFormData({
        ...formData,
        imageURL: data.publicUrl,
      });
    }
  }

  async function handleUploadImageToSupabase() {
    const { data, error } = await supabaseClient.storage
      .from("workinhrs")
      .upload(`/public/${imageData?.name}`, imageData, {
        cacheControl: "3600",
        upsert: false,
      });

    if (data) handleFetchImagePublicUrl(data);
  }

  async function handleSaveFeedPost() {
    await createFeedPostAction(
      {
        userId: user?.id,
        userName:
          profileInfo?.candidateInfo?.name || profileInfo?.recruiterInfo?.name,
        message: formData?.message,
        image: formData?.imageURL,
        likes: [],
      },
      "/feed"
    );

    setFormData({
      imageURL: "",
      message: "",
    });
  }

  async function handleUpdateFeedPostLikes(getCurrentFeedPostItem) {
    let cpyLikesFromCurrentFeedPostItem = [...getCurrentFeedPostItem.likes];
    const index = cpyLikesFromCurrentFeedPostItem.findIndex(
      (likeItem) => likeItem.reactorUserId === user?.id
    );

    if (index === -1) {
      cpyLikesFromCurrentFeedPostItem.push({
        reactorUserId: user?.id,
        reactorUserName:
          profileInfo?.candidateInfo?.name || profileInfo?.recruiterInfo?.name,
      });
    } else {
      cpyLikesFromCurrentFeedPostItem.splice(index, 1);
    }

    getCurrentFeedPostItem.likes = cpyLikesFromCurrentFeedPostItem;
    await updateFeedPostAction(getCurrentFeedPostItem, "/feed");
  }

  useEffect(() => {
    if (imageData) handleUploadImageToSupabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageData]);

  return (
    <Fragment>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b pb-6 pt-24 dark:border-gray-600">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Explore Feed
          </h1>
          <div className="flex items-center">
            <Button
              onClick={() => setShowPostDialog(true)}
              className="flex h-11 items-center justify-center rounded-md px-5 bg-[#a4c868] hover:bg-[#1c3424] text-white"
            >
              Add New Post
            </Button>
          </div>
        </div>
        {/* Feed Posts */}
        <div className="py-12">
          <div className="flex flex-col gap-5">
            {allFeedPosts && allFeedPosts.length > 0 ? (
              allFeedPosts.map((feedPostItem) => (
                <div
                  key={feedPostItem._id}
                  className="group relative flex flex-col sm:flex-row gap-8 p-6 rounded-3xl bg-[#faecd2] dark:bg-[#1c3424] hover:bg-opacity-90 transition-all duration-300 shadow-lg"
                >
                  <div className="sm:w-2/6 overflow-hidden rounded-3xl transition-all duration-500 group-hover:rounded-xl">
                    <img
                      src={feedPostItem?.image}
                      alt="Post"
                      className="h-80 w-full object-cover object-top transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="sm:w-4/6">
                    <span className="mb-2 inline-block font-medium text-gray-500 dark:text-gray-300">
                      {feedPostItem?.userName}
                    </span>
                    <h3 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                      {feedPostItem?.message}
                    </h3>
                    <div className="flex items-center gap-5">
                      <Heart
                        size={25}
                        fill={
                          feedPostItem?.likes?.length > 0 ? "#a4c868" : "none"
                        }
                        stroke="#a4c868"
                        className="cursor-pointer"
                        onClick={() => handleUpdateFeedPostLikes(feedPostItem)}
                      />
                      <span className="font-semibold text-xl text-gray-800 dark:text-white">
                        {feedPostItem?.likes?.length}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-center text-gray-600 dark:text-gray-300">
                No posts found!
              </h1>
            )}
          </div>
        </div>
      </div>

      {/* New Post Dialog */}
      <Dialog
        open={showPostDialog}
        onOpenChange={() => {
          setShowPostDialog(false);
          setFormData({ message: "", imageURL: "" });
        }}
      >
        <DialogContent className="h-[550px] bg-[#faecd2] dark:bg-[#1c3424]">
          <Textarea
            name="message"
            value={formData?.message}
            onChange={(event) =>
              setFormData({ ...formData, message: event.target.value })
            }
            placeholder="What do you want to talk about?"
            className="border-none outline-none focus:ring-0 focus:ring-offset-0 h-[200px] text-[28px] bg-transparent text-gray-900 dark:text-white"
          />
          <div className="flex items-center justify-between mt-4">
            <Label htmlFor="imageURL" className="flex items-center gap-2 text-gray-800 dark:text-white">
              <CirclePlus size={24} />
              <Input
                onChange={handleFileOnChange}
                className="hidden"
                id="imageURL"
                type="file"
              />
              <span className="text-sm">Upload Image</span>
            </Label>
            <Button
              onClick={handleSaveFeedPost}
              disabled={formData?.imageURL === "" && formData?.message === ""}
              className="w-40 h-11 rounded-md px-5 bg-[#a4c868] hover:bg-[#1c3424] text-white disabled:opacity-50"
            >
              Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default Feed;
