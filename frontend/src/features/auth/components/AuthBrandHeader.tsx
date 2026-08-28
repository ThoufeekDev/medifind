// features/auth/components/AuthBrandHeader.tsx

interface AuthBrandHeaderProps {
  title: string;
  description: string;
}

export default function AuthBrandHeader({
  title,
  description,
}: AuthBrandHeaderProps) {
  return (
    <header className="brand-header">
      <div className="brand-logo" aria-hidden="true">
        {/* SVG */}
        MediFind
      </div>

      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}