"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import { LIMA_DISTRICTS, GenderOptions } from "@/constants";
import { UserFormValidation } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import SubmitButton from "../SubmitButton";
import { createUser } from "@/lib/actions/profile.actions";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "./ProfileForm";
import FileUploader from "../FileUploader";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: LIMA_DISTRICTS[0].name,
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      console.log("attempting user creation with data", user);

      const newUser = await createUser(user);

      if (newUser) router.push(`/profiles/${newUser.$id}/register`);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">
            Bienvenido!{" "}
            <span className="sub-header">
              {user?.name.split(" ")[0][0].toUpperCase() + user?.name.slice(1)}
            </span>
          </h1>
          <p className="text-dark-700">Permítenos conocer más sobre ti</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>

          {/* NAME */}

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          {/* GENDER */}

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Género"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option, i) => (
                    <div key={option + i} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="location"
              label="¿Dónde vive?"
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
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="profilePicture"
              label="Foto de perfil"
              renderSkeleton={(field) => (
                <FormControl>
                  <FileUploader
                    files={field.value}
                    onChange={field.onChange}
                  ></FileUploader>
                </FormControl>
              )}
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h3 className="sub-header">
              ¿Deseas adoptar o tienes animales en adopción?
            </h3>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="isCaretaker"
          label="tengo animales en adopción"
        />

        <SubmitButton isLoading={isLoading}>Guardar datos</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
