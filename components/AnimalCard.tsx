import { Card, CardContent } from "@/components/ui/card";
import { Pet } from "@/types/appwrite.types";
import Image from "next/image";
type AnimalCardProps = {
  animal: Pet;
};

// AnimalCard Component
const AnimalCard = ({ animal }: AnimalCardProps) => {
  return (
    <Card className="p-4">
      <Image
        src={animal.photoUrls?.[0] || "/assets/icons/breed.svg"}
        alt={animal.name}
        width={150}
        height={210}
        className="w-full h-48 object-cover rounded-lg"
      />
      <CardContent>
        <h3 className="text-xl font-bold text-center mt-2 mb-2">
          {animal.name}
        </h3>

        <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-dark-700">
          <span className="font-semibold">Edad:</span>{" "}
          <span>{Math.trunc(animal?.age / 12) || 0} años aprox.</span>
          <span className="font-semibold">Raza:</span>{" "}
          <span>{animal?.breed || "raza desconocida"}</span>
          <span className="font-semibold">Ubicación:</span>{" "}
          <span>{animal?.location}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimalCard;
