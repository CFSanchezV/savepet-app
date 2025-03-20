import clsx from "clsx";
import React from "react";
import Image from "next/image";

type StatCardProps = {
  type: "gatos" | "perros" | "otros";
  count: number;
  label: string;
  icon: string;
};

const StatCard = ({ count = 0, type, label, icon }: StatCardProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-green-500": type === "gatos",
        "bg-blue-500": type === "perros",
        "bg-yellow-500": type === "otros",
      })}
    >
      <div className="flex items-center gap-4">
        <Image src={icon} alt={label} width={32} height={32} />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>

      <p className="text-16-semibold text-white">{label}</p>
    </div>
  );
};

export default StatCard;
