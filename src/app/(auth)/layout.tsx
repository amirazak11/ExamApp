import { BookOpenCheck, Brain, FolderCode, RectangleEllipsis } from "lucide-react";

interface WebsiteLayoutProps {
  children: React.ReactNode;
}

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <>
      <div className="grid grid-cols-[32rem_1fr] min-h-screen ">
       


<div className="relative h-full w-full   overflow-hidden ">
  <div className="absolute -bottom-32 -left-32 w-[320px] h-80 bg-blue-200 rounded-full backdrop-blur-xs"></div>

  <div className="absolute -top-32 -right-32 w-[320px] h-80 bg-blue-200 rounded-full backdrop-blur-xs"></div>
<div className="relative h-full w-full backdrop-blur-md  gap-8  flex flex-col py-20 px-18">
          <h1 className="mt-3 flex items-center gap-2 text-sm font-medium text-[#1f5ef3]">
            <FolderCode className="size-8" />
            Exam App
          </h1>
  <div className="">
          <h2 className="text-3xl font-bold text-balance text-gray-700 leading-relaxed">
        Empower your learning journey
        with our smart exam platform.
      </h2>
  </div>

        <div className="py-4 flex flex-col gap-3 ">

        {/* item */}
        <div className="flex gap-4">
          <div className="text-blue-600 text-xl border border-blue-600 h-8 w-8 flex items-center justify-center flex-shrink-0">
            <Brain />
          </div>
          <div>
            <h3 className="text-blue-600 font-semibold">
              Tailored Diplomas
            </h3>
            <p className="text-gray-600 text-sm">
  Choose from specialized tracks like Frontend, Backend, and Mobile Development.
            </p>
          </div>
        </div>

        {/* item */}
        <div className="flex gap-4">
          <div className="text-blue-600 text-xl border border-blue-600 h-8 w-8 flex items-center justify-center flex-shrink-0">
            <BookOpenCheck  />
          </div>
          <div>
            <h3 className="text-blue-600 font-semibold">
              Focused Exams
            </h3>
            <p className="text-gray-600 text-sm">
              Access topic-specific tests including HTML,
              CSS, JavaScript, and more.
            </p>
          </div>
        </div>

        {/* item */}
        <div className="flex gap-4">
          <div className="text-blue-600 text-xl border border-blue-600 h-8 w-8 flex items-center justify-center flex-shrink-0">
            <RectangleEllipsis  />
          </div>
          <div>
            <h3 className="text-blue-600 font-semibold">
              Smart Multi-Step Forms
            </h3>
            <p className="text-gray-600 text-sm">
              Choose from specialized tracks like Frontend,
              Backend, and Mobile Development.
            </p>
          </div>
        </div>

      </div>
</div>




</div>
  <div className=" flex items-center justify-center   h-full w-full">
			<div className="mx-auto w-xl  rounded-xl bg-white space-y-2.5">
  {children}
			</div>
  </div>

  
      </div>

</>
  )
}
