/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  declare type Species = "perro" | "gato" | "otro";
  declare type Size = "pequeño" | "mediano" | "grande";
  declare type PetGender = "macho" | "hembra";
  declare type AdoptionStatus = "disponible" | "adoptado" ;

  declare type Gender = "masculino" | "femenino" | "otro";

  declare type RevisionStatus = "pendiente" | "revisado" | "removido" ;
  
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
    profilePic: string;
    isCaretaker: boolean;
    location: string;
  }