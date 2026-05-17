import { IDiploma } from "@/lib/types/IDiploma";
import Image from "next/image";
import Link from "next/link";

type DiplomasListProps = {
  data: IDiploma[];
};

export default function DiplomasList({ data }: DiplomasListProps) {
  return (
    <>
      {data?.map((diploma: IDiploma) => (
        <Link key={diploma.id} href={`/${diploma.id}`}>
          <div className="relative overflow-hidden">
            <Image
              unoptimized
              src={diploma.image || "/placeholder.png"}
  alt={diploma.title || "AI Diploma"}
              width={800}
              height={470}
              className="h-[470px] w-full object-cover"
            />
            <div className="absolute inset-x-3 bottom-3 bg-blue-600/75 p-4 text-white">
              <h3 className="mb-2 font-semibold text-xl">{diploma.title}</h3>
              <p className="text-sm text-blue-100">{diploma.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
