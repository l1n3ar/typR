import { ErrorCalculation } from '@prisma/client';

type ErrorType = 'full' | 'half';

interface ErrorCount {
  full: number;
  half: number;
}

function countFullMistakes(typedText: string, originalText: string): number {
  const typedWords = typedText.split(/\s+/);
  const originalWords = originalText.split(/\s+/);
  let mistakes = 0;

  // Check for omissions, substitutions, additions
  mistakes += Math.abs(typedWords.length - originalWords.length);

  for (let i = 0; i < Math.min(typedWords.length, originalWords.length); i++) {
    if (typedWords[i] !== originalWords[i]) {
      mistakes++;
    }
  }

  // Check for spelling errors, repetitions, and incomplete words
  for (let i = 0; i < typedWords.length; i++) {
    if (!/^[a-zA-Z]+$/.test(typedWords[i])) {
      mistakes++;
    }
    if (i > 0 && typedWords[i] === typedWords[i - 1]) {
      mistakes++;
    }
  }

  return mistakes;
}

function countHalfMistakes(typedText: string, originalText: string): number {
  let mistakes = 0;

  // Spacing errors
  mistakes += (typedText.match(/\s{2,}/g) || []).length;
  mistakes += (typedText.match(/[a-z][A-Z]|[A-Z][a-z]/g) || []).length;

  // Capitalization errors
  for (let i = 0; i < Math.min(typedText.length, originalText.length); i++) {
    if (typedText[i].toLowerCase() === originalText[i].toLowerCase() &&
        typedText[i] !== originalText[i]) {
      mistakes++;
    }
  }

  // Punctuation errors
  const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
  const typedPunctuation = typedText.match(punctuationRegex) || [];
  const originalPunctuation = originalText.match(punctuationRegex) || [];
  mistakes += Math.abs(typedPunctuation.length - originalPunctuation.length);

  // Transposition errors (simplified check)
  const typedWords = typedText.split(/\s+/);
  const originalWords = originalText.split(/\s+/);
  for (let i = 0; i < Math.min(typedWords.length - 1, originalWords.length - 1); i++) {
    if (typedWords[i] === originalWords[i + 1] && typedWords[i + 1] === originalWords[i]) {
      mistakes++;
      i++; // Skip the next word as it's part of the transposition
    }
  }

  // Paragraphic errors (simplified check)
  mistakes += (typedText.match(/\n\s+/g) || []).length;

  return mistakes;
}

export function calculateErrors(typedText: string, originalText: string, calculationType: ErrorCalculation): ErrorCount {
  const fullMistakes = countFullMistakes(typedText, originalText);
  const halfMistakes = countHalfMistakes(typedText, originalText);

  if (calculationType === ErrorCalculation.SST) {
    return {
      full: fullMistakes,
      half: halfMistakes
    };
  } else {
    // For NORMAL calculation, convert half mistakes to full mistakes
    return {
      full: fullMistakes + Math.ceil(halfMistakes / 2),
      half: 0
    };
  }
}

export function calculateAccuracy(typedText: string, originalText: string, calculationType: ErrorCalculation): number {
  const errors = calculateErrors(typedText, originalText, calculationType);
  const totalErrors = errors.full + errors.half / 2;
  const totalCharacters = originalText.length;
  
  const accuracy = ((totalCharacters - totalErrors) / totalCharacters) * 100;
  return Math.max(0, Math.min(100, accuracy)); // Ensure accuracy is between 0 and 100
}
