import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getPetById } from "@/lib/actions/pet.actions";
import { Button } from "@/components/ui/button";

const SuccessPage = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const petId = (searchParams?.petId as string) || "";
  const pet = await getPetById(petId);

  console.log(pet);

  return (
    <div className="flex h-screen max-h-screen px-[5%] py-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/savepet_logo_full.png"
            alt="logo"
            width={1000}
            height={1000}
            className="h-20 w-20"
          />
        </Link>

        <section className="flex flex-col items-center justify-center">
          <Image
            src="/assets/gifs/success.gif"
            alt="success"
            width={300}
            height={280}
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Tu <span className="text-green-500">mascota</span> ha sido creada
            con éxito!
          </h2>
          <p className="text-center text-white-600">
            Pronto le encontraremos un hogar a{" "}
            <span className="text-green-500 font-bold">
              {pet?.name as string}
            </span>
          </p>
        </section>
        <section className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-3">
            <Image
              src={pet?.photoUrls?.[0] || "/assets/icons/breed.svg"}
              alt="photo"
              width={150}
              height={190}
              className="rounded-lg object-cover mb-4"
            />
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/assets/icons/species.svg"
              alt="species"
              width={50}
              height={50}
            />
            <p className="whitespace-nowrap" margin-bottom="0px">{pet?.species as string} de</p>
            <p className="whitespace-nowrap">{((pet?.age as number) / 12).toPrecision(1)} &nbsp; años aprox.</p>
          </div>
        </section>

        <div className="flex flex-row gap-4">
        <Button variant="outline" className="flex items-center shad-primary-btn" asChild>
          <Link href={`/profiles/${userId}/new-pet`}>
            <Image src="/assets/icons/pets.svg" alt="arrow-left" width={24} height={24} />
            ¿otra mascota?
          </Link>
        </Button>

        <Button variant="outline" className="flex shad-secondary-btn" asChild>
          <Link href={`/pets`}>
            <Image src="/assets/icons/breed.svg" alt="arrow-left" width={24} height={24} />
            adopta hoy ❤️
          </Link>
        </Button>
        </div>
        <p className="copyright">
          ©️ 2025 SavePet
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
