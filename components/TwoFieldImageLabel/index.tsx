import TextSkeleton from "../TextSkeleton";

interface IProps {
  firstField: string;
  secondField: string;
  loaded?: boolean;
}
export default function TwoFieldImageLabel({
  firstField,
  secondField,
  loaded = true,
}: IProps) {
  const shareClassesDefault = "text-ellipsis overflow-hidden whitespace-nowrap";

  return (
    <>
      <TextSkeleton
        text={firstField}
        defaultClassNames={`text-[14.9px] leading-[22px] tracking-[0.139688px] ${shareClassesDefault}`}
        classNamesWhileLoading="w-[70%] h-[20px]"
        loaded={loaded}
      />
      <TextSkeleton
        text={secondField}
        defaultClassNames={`text-[11.17px] leading-[17px] tracking-[0.3725px] text-greyscaleLighter ${shareClassesDefault}`}
        classNamesWhileLoading="w-[45%] h-[15px] mt-[4px]"
        loaded={loaded}
      />
    </>
  );
}
