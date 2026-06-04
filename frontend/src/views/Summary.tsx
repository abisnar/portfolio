interface Props {
  text: string;
}

export function Summary({ text }: Props) {
  return <p className="summary">{text}</p>;
}
