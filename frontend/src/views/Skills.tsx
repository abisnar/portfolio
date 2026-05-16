interface Props {
  items: string[];
}

export function Skills({ items }: Props) {
  return (
    <ul className="skills">
      {items.map((s) => <li key={s}>{s}</li>)}
    </ul>
  );
}
