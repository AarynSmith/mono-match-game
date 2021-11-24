import { Icon, IconType } from "./Icon";

type CardProps = {
  icons: IconType[];
};

export const Card = ({ icons }: CardProps) => (
  <div style={{}} className="card">
    {icons.map((v, i, arr) => (
      <Icon key={i} icon={v} number={i} total={arr.length} size={"1.25em"} />
    ))}
  </div>
);
