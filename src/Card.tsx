import { Icon } from "./Icon";

type CardProps = {
  icons: string[];
};

export const Card = ({ icons }: CardProps) => (
  <div style={{}} className="card">
    {icons.map((v, i, arr) => (
      <Icon key={i} icon={v} number={i} total={arr.length} size={"2em"} />
    ))}
  </div>
);
