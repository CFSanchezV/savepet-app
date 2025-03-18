"use server";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PET_COLLECTION_ID,
  PROJECT_ID,
  storage,
} from "../appwrite.config";
import { ID } from "node-appwrite";
import { parseStringify } from "../utils";

// create pet
export const createPet = async ({ photos, ...petData }: CreatePetParams) => {
  try {
    console.log("Starting createPet function with data:", {
      ...petData,
      hasPhotos: !!photos,
    });

    let photoUrls: string[] = [];

    if (photos) {
      console.log("Starting photo upload process...");
      // Get all files from FormData
      const files = photos.getAll("photos") as File[];
      console.log(`Found ${files.length} photos to upload`);

      // Upload files and collect URLs
      const uploadPromises = files.map(async (file, index) => {
        try {
          console.log(`Uploading photo ${index + 1}/${files.length}`);
          const fileId = ID.unique();
          console.log(`Generated fileId: ${fileId}`);

          await storage.createFile(BUCKET_ID!, fileId, file);
          console.log(`Successfully uploaded file ${index + 1}`);

          const url = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;
          console.log(`Generated URL for file ${index + 1}:`, url);
          return url;
        } catch (error) {
          console.error(`Error uploading file ${index + 1}:`, error);
          throw error;
        }
      });

      photoUrls = await Promise.all(uploadPromises);
      console.log("All photos uploaded successfully:", photoUrls);
    }

    const petId = ID.unique();
    console.log("Creating pet document in database with ID:", petId);
    const newPet = await databases.createDocument(
      DATABASE_ID!,
      PET_COLLECTION_ID!,
      petId,
      {
        ...petData,
        petId,
        photoUrls,
      }
    );
    console.log("Successfully created pet document:", newPet);

    return parseStringify(newPet);
  } catch (error) {
    console.error("Error in createPet function:", error);
    throw error; // Re-throw to handle in the form
  }
};
