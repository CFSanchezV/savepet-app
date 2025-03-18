"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { CreatePetSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./ProfileForm";
import {
  LIMA_DISTRICTS,
  PetGenderOptions,
  SpeciesOptions,
  SizeOptions,
  AdoptionStatusOptions,
} from "@/constants";
import { SelectItem } from "../ui/select";
import PetImageUploader from "../PetImageUploader";
import { Form, FormControl } from "../ui/form";
import Image from "next/image";
import { createPet } from "@/lib/actions/pet.actions";

const PetForm = ({
  type,
  userId,
  profileId,
}: {
  type: "create" | "update";
  userId: string;
  profileId: string;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof CreatePetSchema>>({
    defaultValues: {
      name: "",
      species: undefined,
      breed: "",
      age: undefined,
      size: undefined,
      petGender: undefined,
      description: "",
      photos: [],
      location: "",
      status: "disponible",
      birthDate: new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof CreatePetSchema>) => {
    setIsLoading(true);
    console.log("Starting form submission with values:", values);

    //calculate age in months from datepicker
    const birthDate = values?.birthDate;
    if (birthDate) {
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const ageInMonths = age * 12 + today.getMonth() - birthDate.getMonth();
      values.age = ageInMonths;
    } else {
      values.age = 1;
    }

    let petData;
    try {
      console.log("Preparing pet data...");
      const formData = new FormData();

      // Append photos to FormData if they exist
      if (values.photos?.length) {
        values.photos.forEach((file) => {
          formData.append("photos", file);
        });
      }

      if (type === "create" && userId) {
        petData = {
          userId: userId,
          name: values.name,
          species: values.species,
          breed: values.breed || "",
          age: values.age || 0,
          size: values.size,
          petGender: values.petGender as PetGender,
          description: values.description,
          location: values.location,
          status: "disponible" as AdoptionStatus,
          birthDate: values?.birthDate || new Date(),
          photos: formData,
          photoUrls: [],
          createdAt: new Date(),
        };
      } else if (type === "update" && userId) {
        petData = {
          userId: userId,
          name: values.name,
          species: values.species,
          breed: values.breed || "",
          age: values.age || 0,
          size: values.size,
          petGender: values.petGender as PetGender,
          description: values.description,
          location: values.location,
          status: values.status as AdoptionStatus,
          birthDate: values?.birthDate || new Date(),
          photos: formData,
          photoUrls: [],
          createdAt: new Date(),
        };
      }

      if (!petData) {
        throw new Error("Invalid form data");
      }

      console.log("Sending pet data to createPet:", petData);
      const newPet = await createPet(petData);
      console.log("Response from createPet:", newPet);

      if (newPet) {
        router.push(`/pets`);
      }
    } catch (error) {
      console.error("Error in form submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  let buttonLabel;

  switch (type) {
    case "create":
      buttonLabel = "Crear mascota";
      break;
    case "update":
      buttonLabel = "Crear mascota";
      break;
    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Nueva mascota</h1>
          <p className="text-dark-700">
            Preséntanos a la mascota para que pueda ser adoptada
          </p>
        </section>

        {type !== "create" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Nombre"
              placeholder="Firulais"
              iconSrc="/assets/icons/pets.svg"
              iconAlt="name"
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="status"
              label="Estado"
              placeholder="Selecciona un estado"
            >
              {AdoptionStatusOptions.map((adoptionStatus) => (
                <SelectItem key={adoptionStatus} value={adoptionStatus}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={`${
                        adoptionStatus === "disponible"
                          ? "/assets/icons/check-circle.svg"
                          : "/assets/icons/cancelled.svg"
                      }`}
                      width={32}
                      height={32}
                      alt="status"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{adoptionStatus}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="species"
                label="Especie"
                placeholder="Selecciona una especie"
              >
                {SpeciesOptions.map((species) => (
                  <SelectItem key={species} value={species}>
                    <div className="flex flex-col cursor-pointer items-center gap-2">
                      <p>{species}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>

              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="petGender"
                label="Género"
                placeholder="Selecciona un género"
              >
                {PetGenderOptions.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    <div className="flex flex-col cursor-pointer items-center gap-2">
                      <p>{gender}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
            </div>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="breed"
              label="Raza (opcional)"
              placeholder="Labrador"
              iconSrc="/assets/icons/breed.svg"
              iconAlt="breed"
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="location"
              label="¿Dónde se encuentra?"
              placeholder="Selecciona un distrito"
            >
              {LIMA_DISTRICTS.map((district) => (
                <SelectItem key={district.name} value={district.name}>
                  <div className="flex flex-col cursor-pointer items-center gap-2">
                    <p>{district.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="birthDate"
                label="Fecha de nacimiento aproximada"
              />

              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="size"
                label="Tamaño"
                placeholder="Selecciona un tamaño"
              >
                {SizeOptions.map((size) => (
                  <SelectItem key={size} value={size}>
                    <div className="flex flex-col cursor-pointer items-center gap-2">
                      <p>{size}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
            </div>

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="description"
              label="Descripción"
              placeholder="Perrito peludo blanco que le gusta jugar a la pelota"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="photos"
              label="Fotos de la mascota"
              renderSkeleton={(field: {
                value: File[] | undefined;
                onChange: (value: File[]) => void;
              }) => (
                <FormControl>
                  <PetImageUploader
                    files={field.value || []}
                    onChange={(files) => field.onChange(files)}
                  />
                </FormControl>
              )}
            />
          </>
        )}

        {type !== "update" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Nombre"
              placeholder="Firulais"
              iconSrc="/assets/icons/pets.svg"
              iconAlt="name"
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="status"
              label="Estado"
              placeholder="Selecciona un estado"
            >
              {AdoptionStatusOptions.map((adoptionStatus) => (
                <SelectItem key={adoptionStatus} value={adoptionStatus}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={`${
                        adoptionStatus === "disponible"
                          ? "/assets/icons/check-circle.svg"
                          : "/assets/icons/cancelled.svg"
                      }`}
                      width={32}
                      height={32}
                      alt="status"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{adoptionStatus}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="species"
                label="Especie"
                placeholder="Selecciona una especie"
              >
                {SpeciesOptions.map((species) => (
                  <SelectItem key={species} value={species}>
                    <div className="flex flex-col cursor-pointer items-center gap-2">
                      <p>{species}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>

              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="petGender"
                label="Género"
                placeholder="Selecciona un género"
              >
                {PetGenderOptions.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    <div className="flex flex-col cursor-pointer items-center gap-2">
                      <p>{gender}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
            </div>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="breed"
              label="Raza (opcional)"
              placeholder="Labrador"
              iconSrc="/assets/icons/breed.svg"
              iconAlt="breed"
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="location"
              label="¿Dónde se encuentra?"
              placeholder="Selecciona un distrito"
            >
              {LIMA_DISTRICTS.map((district) => (
                <SelectItem key={district.name} value={district.name}>
                  <div className="flex flex-col cursor-pointer items-center gap-2">
                    <p>{district.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="birthDate"
                label="Fecha de nacimiento aproximada"
              />

              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="size"
                label="Tamaño"
                placeholder="Selecciona un tamaño"
              >
                {SizeOptions.map((size) => (
                  <SelectItem key={size} value={size}>
                    <div className="flex flex-col cursor-pointer items-center gap-2">
                      <p>{size}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
            </div>

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="description"
              label="Descripción"
              placeholder="Perrito peludo blanco que le gusta jugar a la pelota"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="photos"
              label="Fotos de la mascota"
              renderSkeleton={(field: {
                value: File[] | undefined;
                onChange: (value: File[]) => void;
              }) => (
                <FormControl>
                  <PetImageUploader
                    files={field.value || []}
                    onChange={(files) => field.onChange(files)}
                  />
                </FormControl>
              )}
            />
          </>
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "create" ? "shad-primary-btn" : "shad-secondary-btn"
          }`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default PetForm;
