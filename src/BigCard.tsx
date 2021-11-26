import { Icon, IconType } from "./Icon";

type CardProps = {
  icons: IconType[];
  match: string;
  onClick: (icon: string, match: string) => void;
};

export const BigCard = ({ icons, match, onClick }: CardProps) => {
  if (!icons) return <div className="card">Prob</div>;
  return (
    <div className="card">
      {icons.map((v, i) => (
        <Icon
          onClick={() => onClick(v.name, match)}
          key={i}
          icon={v}
          size={"2em"}
        />
      ))}
    </div>
  );
};
