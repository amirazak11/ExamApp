import { Separator } from '@/components/ui/separator';
import { ArrowRight, CircleQuestionMark, Timer } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
interface ExamCardProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  questions: number;
  duration: number;
}

export function ExamCard({
  id,
  icon,
  title,
  description,
  questions,
  duration,
}: ExamCardProps) {
  return (
<div className="flex gap-4 p-4 bg-blue-50 border border-transparent hover:border-blue-200 hover:border-dashed transition-all relative group">
          <div className="size-24 flex-shrink-0 bg-blue-100 flex items-center justify-center  border border-blue-300">
                    <Image
                      src={`https://exam-app.elevate-bootcamp.cloud${icon}`}
                      unoptimized
                      alt={title}
                      width={74}
                      height={74}
                    />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">{title}</h3>
        <div className="flex items-center gap-4 text-sm mb-3">
          <span className="flex items-center gap-1">
            <CircleQuestionMark className='size-4'/> {questions} Questions
          </span>
<Separator className="bg-gray-300" orientation="vertical"  />
        <span className="flex items-center gap-1">
            <Timer className='size-4'/>  {duration} Minutes
          </span>
        </div>
        </div>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{description}</p>

      </div>
<Link key={id} href={`${id}/exam`} className="absolute bottom-2 right-2 hidden rounded-none bg-blue-600 p-2 text-white hover:bg-blue-700 group-hover:flex items-center gap-3">
  <span>START</span>
  <ArrowRight className="h-4 w-4" />
</Link>
    </div>
  );
}
