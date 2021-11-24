type IconProps = {
  icon: JSX.Element | string;
  number: number;
  total: number;
  size: string;
  onClick?: () => void;
};

export function Icon({ icon, number, total, size, onClick }: IconProps) {
  const rot = number * (360 / total) - 90;
  const style = {
    height: size,
    width: size,
    fontSize: `calc(${size} * .6)`,
    transform: [
      `translate(-50%,-50%)`,
      `rotate(${rot}deg)`,
      `translate(calc(${size} * .75))`,
      `rotate(${-1 * rot}deg)`,
    ].join(" "),
  };

  return (
    <div style={style} onClick={onClick} className="icon">
      {icon}
    </div>
  );
}
