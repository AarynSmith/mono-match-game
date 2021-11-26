import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type IconType = { name: string; icon: IconProp; color: string };

type IconProps = {
  icon: IconType;
  size: string;
  onClick?: () => void;
};

export function Icon({ icon, size, onClick }: IconProps) {
  const style = {
    fontSize: size,
  };

  return (
    <div style={style} className="icon">
      <FontAwesomeIcon icon={icon.icon} onClick={onClick} color={icon.color} />
    </div>
  );
}
