import { MarkdocRenderer } from '../components/MarkdocRenderer';
import content from '../content/authentication.md?raw';

export function AuthPage() {
  return <MarkdocRenderer content={content} />;
}
