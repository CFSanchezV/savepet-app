import { Models } from "node-appwrite";

export interface Pet extends Models.Document {
  userId: string;
  name: string;
  species: Species;
  breed: string;
  age: number;
  size: Size;
  gender: PetGender;
  description: string;
  profilePic: FormData[] | undefined;
  location: string;
  careTakerId: string;
  status: AdoptionStatus;
  createdAt: Date;
}

export interface Profile extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  profilePic: FormData | undefined;
  isCaretaker: boolean;
  gender: Gender;
}

export interface ReportedPost extends Models.Document {
  reportedBy: string;
  postId: string;
  reason: string;
  revisionStatus: RevisionStatus;
  createdAt: Date;
}

export interface Adoption extends Models.Document {
  petId: string;
  adopterId: string;
  caretakerId: string;
  adoptionDate: Date;
}