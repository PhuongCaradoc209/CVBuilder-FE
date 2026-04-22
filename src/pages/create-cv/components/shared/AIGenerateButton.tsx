import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { cvService } from '@/services/cv.service';

interface AIGenerateButtonProps {
  section: string;
  draftText?: string;
  cvId?: string;
  onSuggest: (suggestion: string) => void;
}

export function AIGenerateButton({ section, draftText, cvId, onSuggest }: AIGenerateButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!cvId) {
      toast.error('Please save your CV as a draft first to use AI suggestions.');
      return;
    }

    if (!draftText || draftText.trim().length < 5) {
      toast.error('Please enter at least a few keywords or a short description first.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await cvService.generateAISuggestion({
        section,
        draftText,
        tone: 'professional',
        cvId,
      });

      if (res.success && res.data.suggestion) {
        onSuggest(res.data.suggestion);
        toast.success('AI suggestion generated!');
      } else {
        toast.error(res.message || 'Failed to generate AI suggestion');
      }
    } catch (error) {
      console.error('AI suggestion error:', error);
      toast.error('An error occurred while generating suggestion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type='button'
      variant='outline'
      size='sm'
      onClick={handleGenerate}
      disabled={isLoading || !cvId}
      className='bg-primary/5 text-primary hover:bg-primary/10 border-primary/20 h-7 gap-1.5 rounded-lg px-2 text-[10px] font-bold tracking-wider uppercase shadow-none'>
      <Sparkles className={`h-3.5 w-3.5 ${isLoading ? 'animate-pulse' : ''}`} />
      {isLoading ? 'Generating...' : 'AI Gen'}
    </Button>
  );
}
