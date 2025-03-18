import ProfileForm from "@/components/forms/ProfileForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP Verification */}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.png"
            height={1000}
            width={1000}
            alt="pet"
            className="mb-12 h-10 w-fit"
          />

          <ProfileForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              ©️ 2025 Savepet
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/adoption-img.jpg"
        height={1000}
        width={1000}
        alt="adoption"
        className="side-img max-w-[50%]"
      />
    </div>
  )
}
