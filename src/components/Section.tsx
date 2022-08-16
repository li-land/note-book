import { FC, ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}
const Section: FC<SectionProps> = ({ title, children }) => {
  return (
    <>
      <h2 className="title">{title}</h2>
      {children}
    </>
  );
};

export default Section;
