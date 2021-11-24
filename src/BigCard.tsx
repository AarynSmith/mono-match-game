import { Icon } from "./Icon";

type CardProps = {
  icons: JSX.Element[] | string[] | any[];
  match: string;
  onClick: (icon: string, match: string) => void;
};

export const BigCard = ({ icons, match, onClick }: CardProps) => {
  if (!icons) return <div className="card">Prob</div>;
  return (
    <div className="card">
      {icons.map((v, i, arr) => (
        <Icon
          onClick={() => onClick(v.name, match)}
          key={i}
          icon={v.icon}
          number={i}
          total={arr.length}
          size={"3em"}
        />
      ))}
    </div>
  );
};
