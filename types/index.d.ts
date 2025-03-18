/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Species = "perro" | "gato" | "otro";
declare type Size = "pequeño" | "mediano" | "grande";
declare type PetGender = "macho" | "hembra";
declare type AdoptionStatus = "disponible" | "adoptado";

declare type Gender = "masculino" | "femenino" | "otro";

declare type RevisionStatus = "pendiente" | "revisado" | "removido";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  name: string;
  email: string;
  phone: string;
  gender: Gender;
  location: string;
  profilePic: FormData | undefined;
  isCaretaker: boolean;
}

declare type CreatePetParams = {
  userId: string;
  name: string;
  species: Species;
  breed: string;
  age: number;
  size: Size;
  petGender: PetGender;
  description: string;
  location: string;
  status: AdoptionStatus;
  birthDate: Date;
  photos: FormData | undefined;
  photoUrls: string[] | undefined;
  createdAt: Date;
};
