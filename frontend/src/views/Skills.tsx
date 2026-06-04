interface Props {
  items: string[];
}

export function Skills({ items }: Props) {
  return (
    <ul className="skills">
      {items.map((s) => (
        <li key={s} className="chip">{s}</li>
      ))}
    </ul>
  );
}
