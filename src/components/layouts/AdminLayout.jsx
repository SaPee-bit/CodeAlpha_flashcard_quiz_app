// components/layouts/AdminLayout.jsx
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  currentCard,
  flashcards,
  currentIndex,
  showAnswer,
  selectedOption,
  allAnswered,
  isEditing,
  isAdding,
  editData,
  score,
  setSelectedOption,
  setEditData,
  nextCard,
  prevCard,
  handleShowAnswer,
  startEdit,
  startAdd,
  handleEditSubmit,
  handleAddSubmit,
  deleteCard,
}) {
  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      $1
      <p className="text-center text-sm text-gray-500">Card {currentIndex + 1} of {flashcards.length}</p>

      {flashcards.length > 0 && !isEditing && !isAdding && (
        <Card>
          <CardContent className="p-6 space-y-4 text-center">
            <p className="text-lg font-medium mb-4">{currentCard.question}</p>
            <div className="grid grid-cols-2 gap-2">
              {currentCard.options.map((opt, i) => (
                <Button
                  key={i}
                  variant={selectedOption === opt ? 'default' : 'outline'}
                  onClick={() => setSelectedOption(opt)}
                  disabled={showAnswer}
                >
                  {opt}
                </Button>
              ))}
            </div>
            <Button onClick={handleShowAnswer} disabled={selectedOption === null || showAnswer}>
              Show Answer
            </Button>
            {showAnswer && (
              <div className="mt-4 space-y-2">
                <p>Your Answer: <span className="font-semibold">{selectedOption}</span></p>
                <p>Correct Answer: <span className="font-bold text-green-600">{currentCard.answer}</span></p>
                <p className="text-sm text-gray-600">Explanation: {currentCard.explanation}</p>
              </div>
            )}
            <div className="flex justify-between mt-4">
              <Button onClick={prevCard}>Previous</Button>
              <Button onClick={nextCard}>Next</Button>
            </div>
            <div className="flex justify-between mt-2">
              <Button onClick={startEdit}>Edit</Button>
              <Button onClick={deleteCard} variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {(isEditing || isAdding) && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <input
              className="w-full p-2 border rounded"
              placeholder="Question"
              value={editData.question}
              onChange={(e) => setEditData({ ...editData, question: e.target.value })}
            />
            <input
              className="w-full p-2 border rounded"
              placeholder="Answer"
              value={editData.answer}
              onChange={(e) => setEditData({ ...editData, answer: e.target.value })}
            />
            {editData.options.map((opt, index) => (
              <input
                key={index}
                className="w-full p-2 border rounded"
                placeholder={`Option ${index + 1}`}
                value={opt}
                onChange={(e) => {
                  const newOptions = [...editData.options];
                  newOptions[index] = e.target.value;
                  setEditData({ ...editData, options: newOptions });
                }}
              />
            ))}
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Explanation (optional)"
              value={editData.explanation}
              onChange={(e) => setEditData({ ...editData, explanation: e.target.value })}
            />
            <Button onClick={isEditing ? handleEditSubmit : handleAddSubmit}>
              {isEditing ? 'Update' : 'Add'} Flashcard
            </Button>
          </CardContent>
        </Card>
      )}

      {!isEditing && !isAdding && (
        <>
          <Button className="w-full" onClick={startAdd}>Add New Flashcard</Button>
          {allAnswered && (
            <div className="text-center mt-4 text-lg font-semibold">
              You scored {score} out of {flashcards.length}
            </div>
          )}
        </>
      )}
    </div>
  );
}
