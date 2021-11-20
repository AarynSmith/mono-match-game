import { Icon } from "./Icon";

type CardProps = {
  icons: JSX.Element[] | string[];
};

export const BigCard = ({ icons }: CardProps) => {
  return (
    <div className="card">
      {icons.map((v, i, arr) => (
        <Icon key={i} icon={v} number={i} total={arr.length} size={"3em"} />
      ))}
    </div>
  );
};
