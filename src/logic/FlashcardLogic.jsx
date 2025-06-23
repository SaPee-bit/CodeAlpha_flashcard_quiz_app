import { useEffect, useState } from 'react';

const STORAGE_KEY = 'flashcards';

export default function useFlashcardLogic({ mode = 'user' }) {
  const [flashcards, setFlashcards] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [
      {
        question: 'What is the capital of France?',
        answer: 'Paris',
        options: ['Paris', 'London', 'Rome', 'Berlin'],
        explanation: 'Paris is the capital and most populous city of France.',
      },
      {
        question: 'What  is XML?',
        answer: 'Extensible Markup Language',
        options: ['Extensible Markup Language', 'Extension Makeup Language', 'Extraodinary Markdown Language', 'Extension Marked Location'],
        explanation: 'XML specification defines a standard way to add markup to documents.',
      },
      {
        question: 'Who is the president of United States of America?',
        answer: 'Donald J. Trump',
        options: ['Donald J. Trump', 'Nelson Mandela', 'Bola A. Tinubu', 'Elon Musk'],
        explanation: 'Donald J. Trump is the 45th and 47th President of the United States.',
      },
      {
        question: 'What is a LAN?',
        answer: 'Local Area Network',
        options: ['Loan Area Network', 'Local Access Network', 'Local Area Network', 'Large Account Networth'],
        explanation: 'A local area network (LAN) is a collection of devices connected together in one physical location, such as a building, office, or home.',
      },
      {
        question: 'Which of these is not a type of Mathematical Models?',
        answer: 'Iconic Models',
        options: ['Linear Model', 'Probabilistic Model', ' Deterministic Model', 'Iconic Models'],
        explanation: 'Iconic models represent  the physical simulations to the real life system.',
      },
      {
        question: ' AAL protocols define as all of the optons except?',
        answer: 'SAR',
        options: ['AAL 1', 'SAR', 'AAL 5', 'AAL 2'],
        explanation: 'The ATM Adaptation Layer (AAL) maps the higher-level data into ATM cells to be transported over the ATM network.',
      },
      {
        question: 'Below are list the common categories of database management systems except?',
        answer: 'Query ability',
        options: ['Query ability', 'relational', 'hierarchical', 'object-oriented'],
        explanation: 'Database management systems are categorised according to their data structures and types',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flashcards));
  }, [flashcards]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(Array(flashcards.length).fill(false));
  const [score, setScore] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editData, setEditData] = useState({ question: '', answer: '', options: ['', '', '', ''], explanation: '' });

  const currentCard = flashcards[currentIndex];
  const allAnswered = answered.every((a) => a);

  const nextCard = () => {
    setShowAnswer(false);
    setSelectedOption(null);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setShowAnswer(false);
    setSelectedOption(null);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleShowAnswer = () => {
    if (answered[currentIndex]) return;

    setShowAnswer(true);
    if (selectedOption === currentCard.answer) {
      setScore(score + 1);
    }
    const updated = [...answered];
    updated[currentIndex] = true;
    setAnswered(updated);
  };

  const startEdit = () => {
    if (mode !== 'admin') return;
    setIsEditing(true);
    setEditData(flashcards[currentIndex]);
  };

  const handleEditSubmit = () => {
    if (mode !== 'admin') return;
    const updated = [...flashcards];
    updated[currentIndex] = editData;
    setFlashcards(updated);
    setIsEditing(false);
    setShowAnswer(false);
    setSelectedOption(null);
  };

  const startAdd = () => {
    if (mode !== 'admin') return;
    setIsAdding(true);
    setEditData({ question: '', answer: '', options: ['', '', '', ''], explanation: '' });
  };

  const handleAddSubmit = () => {
    if (mode !== 'admin') return;
    setFlashcards([...flashcards, editData]);
    setAnswered([...answered, false]);
    setIsAdding(false);
  };

  const deleteCard = () => {
    if (mode !== 'admin') return;
    const updated = flashcards.filter((_, index) => index !== currentIndex);
    setFlashcards(updated);
    setAnswered(Array(updated.length).fill(false));
    setCurrentIndex(0);
    setScore(0);
    setShowAnswer(false);
    setSelectedOption(null);
  };

  return {
    flashcards,
    currentIndex,
    currentCard,
    showAnswer,
    selectedOption,
    allAnswered,
    answered,
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
    handleEditSubmit,
    startAdd,
    handleAddSubmit,
    deleteCard,
  };
}
