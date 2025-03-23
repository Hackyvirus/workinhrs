// actions/contactActions.js
"use server";

import { revalidatePath } from "next/cache";
import connectToDB from "@/lib/dbConnect";
import Contact from "@/models/Contact";

export async function createContactAction(formData) {
  await connectToDB();

  // Convert the submitted FormData to a plain object
  const data = Object.fromEntries(formData);
  const { name, email, message } = data;

  try {
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Optionally revalidate the /contact page if you list contacts there
    revalidatePath("/contact");

    return;
  } catch (error) {
    console.error("Error saving contact:", error);
    throw new Error("Failed to save contact");
  }
}
