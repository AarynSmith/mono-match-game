import { Icon } from "./Icon";

type CardProps = {
  icons: JSX.Element[] | string[] | any[];
};

export const Card = ({ icons }: CardProps) => (
  <div style={{}} className="card">
    {icons.map((v, i, arr) => (
      <Icon key={i} icon={v.icon} number={i} total={arr.length} size={"2em"} />
    ))}
  </div>
);
