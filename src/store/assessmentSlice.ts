import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
  id: number;
  title: string;
  type: string;
  options?: string[];
}

interface Section {
  id: number;
  title: string;
  description: string;
  questions: Question[];
  order: number;
}

interface Assessment {
  id?: number;
  title: string;
  category: string;
  description: string;
  sections: Section[];
}

interface AssessmentState {
  currentAssessment: Assessment | null;
  savedAssessments: Assessment[];
}

const initialState: AssessmentState = {
  currentAssessment: null,
  savedAssessments: [],
};

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    setCurrentAssessment: (state, action: PayloadAction<Assessment>) => {
      state.currentAssessment = action.payload;
    },
    updateCurrentAssessment: (state, action: PayloadAction<Partial<Assessment>>) => {
      if (state.currentAssessment) {
        state.currentAssessment = { ...state.currentAssessment, ...action.payload };
      }
    },
    addSection: (state, action: PayloadAction<Section>) => {
      if (state.currentAssessment) {
        state.currentAssessment.sections.push(action.payload);
      }
    },
    updateSection: (state, action: PayloadAction<{ id: number; updates: Partial<Section> }>) => {
      if (state.currentAssessment) {
        const index = state.currentAssessment.sections.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.currentAssessment.sections[index] = { ...state.currentAssessment.sections[index], ...action.payload.updates };
        }
      }
    },
    deleteSection: (state, action: PayloadAction<number>) => {
      if (state.currentAssessment) {
        state.currentAssessment.sections = state.currentAssessment.sections.filter(s => s.id !== action.payload);
      }
    },
    addQuestion: (state, action: PayloadAction<{ sectionId: number; question: Question }>) => {
      if (state.currentAssessment) {
        const section = state.currentAssessment.sections.find(s => s.id === action.payload.sectionId);
        if (section) {
          section.questions.push(action.payload.question);
        }
      }
    },
    updateQuestion: (state, action: PayloadAction<{ sectionId: number; questionId: number; updates: Partial<Question> }>) => {
      if (state.currentAssessment) {
        const section = state.currentAssessment.sections.find(s => s.id === action.payload.sectionId);
        if (section) {
          const questionIndex = section.questions.findIndex(q => q.id === action.payload.questionId);
          if (questionIndex !== -1) {
            section.questions[questionIndex] = { ...section.questions[questionIndex], ...action.payload.updates };
          }
        }
      }
    },
    deleteQuestion: (state, action: PayloadAction<{ sectionId: number; questionId: number }>) => {
      if (state.currentAssessment) {
        const section = state.currentAssessment.sections.find(s => s.id === action.payload.sectionId);
        if (section) {
          section.questions = section.questions.filter(q => q.id !== action.payload.questionId);
        }
      }
    },
    saveAssessment: (state) => {
      if (state.currentAssessment) {
        state.savedAssessments.push({ ...state.currentAssessment, id: Date.now() });
        state.currentAssessment = null;
      }
    },
  },
});

export const {
  setCurrentAssessment,
  updateCurrentAssessment,
  addSection,
  updateSection,
  deleteSection,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  saveAssessment,
} = assessmentSlice.actions;

export default assessmentSlice.reducer;