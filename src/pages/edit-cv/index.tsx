import { useParams } from 'react-router-dom';

import { CVEditor } from '../create-cv/components/CVEditor';

export default function EditCvPage() {
  const { id } = useParams<{ id: string }>();

  return <CVEditor id={id} />;
}
