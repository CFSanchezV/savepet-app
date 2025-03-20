"use client";

import { useState } from "react";
import AnimalCard from "./AnimalCard";
import { Pagination, PaginationItem } from "./ui/pagination";
import { Button } from "./ui/button";
import { Pet } from "@/types/appwrite.types";

type AnimalListProps = {
  animals: Pet[];
  itemsPerPage: number;
};

// AnimalList Component with Pagination
const AnimalList = ({ animals, itemsPerPage = 6 }: AnimalListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(animals.length / itemsPerPage);

  const currentAnimals = animals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentAnimals.map((animal) => (
          <AnimalCard key={animal.$id} animal={animal} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <Button
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            </PaginationItem>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default AnimalList;
