'use client';

import { Suspense } from 'react';
import ResetSenhaContent from './ResetSenhaContent';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <ResetSenhaContent />
    </Suspense>
  );
}
