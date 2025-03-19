import React from "react";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/profile.actions";

const Register = async ({params: {userId}}: SearchParamProps) => {
  const user = await getUser(userId)

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/savepet_logo_full.png"
            height={1000}
            width={1000}
            alt="pet"
            className="mb-12 h-20 w-fit"
          />

          <RegisterForm user={user} />

          <p className="copyright py-12">
            2025 Savepet
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
};

export default Register;
