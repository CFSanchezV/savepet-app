import PetForm from "@/components/forms/PetForm";
import { getProfile } from "@/lib/actions/profile.actions";
import Image from "next/image";

export default async function NewPet({ params: { userId } }: SearchParamProps) {
  const profile = await getProfile(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/savepet_logo_full.png"
            height={1000}
            width={1000}
            alt="pet"
            className="mb-12 h-20 w-fit"
          />

          <PetForm type="create" userId={userId} /* profileId={profile.$id} */ />

          <p className="justify-items-end text-dark-600 xl:text-left mt-2">
            ©️ 2025 Savepet
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/adoption-img.jpg"
        height={1000}
        width={1000}
        alt="pet"
        className="side-img max-w-[390px]"
      />
    </div>
  );
}
