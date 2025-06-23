// components/layouts/UserLayout.jsx
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function UserLayout({
  currentCard,
  flashcards,
  currentIndex,
  showAnswer,
  selectedOption,
  allAnswered,
  answered,
  score,
  setSelectedOption,
  nextCard,
  prevCard,
  handleShowAnswer
}) {
  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Flashcard Quiz</h1>
      <p className="text-center text-sm text-gray-500">Card {currentIndex + 1} of {flashcards.length}</p>

      {flashcards.length > 0 && (
        <Card>
          <CardContent className="p-6 space-y-7 text-center">
            <p className="text-lg font-medium mb-4">{currentCard.question}</p>
            <div className="grid grid-cols-2 gap-5">
              {currentCard.options.map((opt, i) => (
                <Button  
                  key={i}
                  variant={selectedOption === opt ? 'default' : 'outline'}
                  onClick={() => setSelectedOption(opt)}
                  disabled={answered[currentIndex]}
                >
                  {opt}
                </Button>
              ))}
            </div>
            <Button
              onClick={handleShowAnswer}
              disabled={selectedOption === null || showAnswer || answered[currentIndex]}
            >
              Submit
            </Button>
            {showAnswer && (
              <div className="mt-4 space-y-2">
                <p>Your Answer: <span className="font-semibold">{selectedOption}</span></p>
                <p>Correct Answer: <span className="font-bold text-green-600">{currentCard.answer}</span></p>
                <p className="text-sm text-gray-600">Explanation: {currentCard.explanation}</p>
              </div>
            )}
            <div className="flex justify-between mt-4">
              <Button onClick={() => currentIndex > 0 && prevCard()} disabled={currentIndex === 0 || allAnswered}>Previous</Button>
              <Button onClick={nextCard} disabled={!answered[currentIndex] || allAnswered}>Next</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {allAnswered && (
        <div className="text-center mt-4 text-lg font-semibold">
            You scored {score} out of {flashcards.length} 🎉🎉
        </div>
      )}
    </div>
  );
}
