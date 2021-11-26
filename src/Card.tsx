import { Icon, IconType } from "./Icon";

type CardProps = {
  icons: IconType[];
};

export const Card = ({ icons }: CardProps) => (
  <div style={{}} className="card">
    {icons.map((v, i) => (
      <Icon key={i} icon={v} size={"1.25em"} />
    ))}
  </div>
);
