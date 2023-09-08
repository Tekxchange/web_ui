import { c } from "@utils";

interface ICardProps {
  titleText: string;
  subtitleText: string;
}

export default function Card(props: ICardProps) {
  const { subtitleText, titleText } = props;
  return (
    <div
      className={c`rounded-lg shadow-lg bg-gradient-to-l odd:from-blue-200
        odd:to-red-300 even:from-red-300 even:to-blue-200
        dark:odd:from-blue-700 dark:odd:to-red-500
        dark:even:from-red-500 dark:even:to-blue-700`}
    >
      <div className={c`p-4 lg:p-10 rounded-lg dark:bg-[#0000007f]`}>
        <h3 className={c`text-lg lg:text-xl font-bold`}>{titleText}</h3>
        <p className={c`text-sm lg:text-lg text-gray-800 dark:text-slate-50`}>{subtitleText}</p>
      </div>
    </div>
  );
}
