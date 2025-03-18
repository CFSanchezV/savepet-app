"use server";
import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PROFILE_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    console.log("new user created to be", newuser);
    return newuser;
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);

      return documents.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);

  } catch (error: any) {
    console.error("An error occurred while getting a user:", error);
  }
};


// REGISTER PROFILE
export const registerProfile = async ({
  profilePic,
  ...profile
}: RegisterUserParams) => {
  try {
    let file;
    if (profilePic) {
      console.log("profilePic", profilePic?.get("fileName") as string);
      const inputFile =
        profilePic &&
        InputFile.fromBuffer(
          profilePic?.get("blobFile") as Blob,
          profilePic?.get("fileName") as string
        );

      console.log("inputFile", inputFile);

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }
    
    const newProfile = await databases.createDocument(
      DATABASE_ID!,
      PROFILE_COLLECTION_ID!,
      ID.unique(),
      {
        profilePicUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
        ...profile,
      }
    );

    console.log("new profile", newProfile);

    return parseStringify(newProfile);
  } catch (error) {
    console.error("An error occurred while creating a new profile:", error);
  }
};