import MediFindLogo from '../../../components/common/MediFindLogo/MediFindLogo';

interface AuthBrandHeaderProps {
  title: string;
  description: string;
}

export default function AuthBrandHeader({ title, description }: AuthBrandHeaderProps) {
  return (
    <header className="brand-header">
      <MediFindLogo size="md" />

      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}

