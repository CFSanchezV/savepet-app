import Link from "next/link";
import React from "react";
import Image from "next/image";
import StatCard from "@/components/StatCard";
import { getAllPets } from "@/lib/actions/pet.actions";
import { Pet } from "@/types/appwrite.types";
import AnimalList from "@/components/AnimalList";

const AvailablePetsPage = async () => {
  const availablePets = await getAllPets();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="pets-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/savepet_logo_full.png"
            width={100}
            height={100}
            alt="Savepet Logo"
            className="h-20 w-fit"
          />
        </Link>

        <p className="text-16-semibold">Futuras Mascotas</p>
      </header>

      <main className="pets-main">
        <section className="w-full space-y-4">
          <h2 className="header">Bienvenido</h2>
          <p className="text-dark-700">
            Aquí puedes ver todas las mascotas disponibles para adoptar.
          </p>
        </section>

        <section className="pets-stat">
          <StatCard
            type="gatos"
            count={availablePets.gatos}
            label="gatos disponibles"
            icon="assets/icons/cat.svg"
          />

          <StatCard
            type="perros"
            count={availablePets.perros}
            label="perros disponibles"
            icon="assets/icons/dog.svg"
          />

          <StatCard
            type="otros"
            count={availablePets.otros}
            label="otros animales disponibles"
            icon="assets/icons/bunny.svg"
          />
        </section>

        <section className="pets-list">
          <AnimalList animals={availablePets.documents as Pet[]} itemsPerPage={2} />
        </section>
      </main>
    </div>
  );
};

export default AvailablePetsPage;
