/**
 * Lesson data models — the shape of every JSON lesson file.
 *
 * Angular concept: TypeScript interfaces are used throughout Angular
 * to define the shape of data, enabling full type-safety and
 * IDE autocompletion with zero runtime overhead.
 */

export type SectionType = 'text' | 'code' | 'diagram' | 'note' | 'warning' | 'tip';
export type Difficulty  = 'Beginner' | 'Intermediate' | 'Advanced';
export type Language    = 'typescript' | 'html' | 'scss' | 'json' | 'bash' | 'text';

export interface CodeSection {
  type: 'code';
  title?: string;
  filename?: string;
  language: Language;
  code: string;
  explanation?: string;
}

export interface TextSection {
  type: 'text';
  title: string;
  content: string; // plain text paragraphs separated by \n
}

export interface NoteSection {
  type: 'note' | 'warning' | 'tip';
  content: string;
}

export interface DiagramSection {
  type: 'diagram';
  title: string;
  svg: string;       // inline SVG markup
  caption?: string;
}

export type LessonSection = TextSection | CodeSection | NoteSection | DiagramSection;

export interface InterviewQuestion {
  q: string;
  a: string;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  xp: number;
  difficulty: Difficulty;
  estimatedTime: string;
  prevLesson?: { id: string; title: string; route: string };
  nextLesson?: { id: string; title: string; route: string };
  keyPoints: string[];
  sections: LessonSection[];
  interviewQuestions: InterviewQuestion[];
}
