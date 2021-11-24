import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type IconType = { name: string; icon: IconProp; color: string };

type IconProps = {
  icon: IconType;
  number: number;
  total: number;
  size: string;
  onClick?: () => void;
};

export function Icon({ icon, number, total, size, onClick }: IconProps) {
  const rot = number * (360 / total) - 90;
  const style = {
    fontSize: size,
    transform: [
      `translate(-50%,-50%)`,
      `rotate(${rot}deg)`,
      `translate(calc(${size} * 1.25))`,
      `rotate(${-1 * rot}deg)`,
    ].join(" "),
  };

  return (
    <div style={style} className="icon">
      <FontAwesomeIcon icon={icon.icon} onClick={onClick} color={icon.color} />
    </div>
  );
}
