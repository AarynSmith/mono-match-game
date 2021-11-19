type CardProps = {
  icons: string[];
};

type IconProps = {
  icon: string;
  number: number;
  total: number;
};

function Icon({ icon, number, total }: IconProps) {
  const angle = 360 / total;
  const rot = number * angle - 90;
  const transform = `translate(-1em,-1em) rotate( ${rot}deg) translate(${1.75}em) rotate(${
    -1 * rot
  }deg)`;
  return (
    <div style={{ transform }} className="icon">
      {icon}
    </div>
  );
}

export const Card = ({ icons }: CardProps) => (
  <div style={{}} className="card">
    {/* <div className="card-title">{`Card ${number + 1}`}</div> */}
    <div className="icon-container">
      {icons.map((v, i, arr) => (
        <Icon key={i} icon={v} number={i} total={arr.length} />
      ))}
    </div>
  </div>
);
