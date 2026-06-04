interface Props {
  items: string[];
}

export function BulletList({ items }: Props) {
  return (
    <ul className="bullets bullets-standalone">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}
