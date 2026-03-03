import {
  Component, signal, inject, computed,
  ViewChild, ElementRef, AfterViewChecked, OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AiService, ChatMessage } from '../../core/services/ai.service';
import { CodeBlockComponent } from '../../shared/components/code-block/code-block.component';

/**
 * AiHelpComponent — the AI chat interface.
 *
 * Angular Concepts demonstrated:
 *  - signal() for chat state (messages, input, typing indicator)
 *  - computed() to disable send button
 *  - ViewChild + ElementRef to auto-scroll chat window
 *  - AfterViewChecked lifecycle hook for scroll
 *  - FormsModule / [(ngModel)] two-way binding on the input
 *  - Observable.subscribe() for async AI responses
 *  - @for new control flow for rendering messages
 */
@Component({
  selector: 'app-ai-help',
  imports: [FormsModule, RouterLink, CodeBlockComponent],
  templateUrl: './ai-help.component.html',
})
export class AiHelpComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatEnd') chatEndRef!: ElementRef<HTMLDivElement>; // auto-scroll anchor

  private aiService = inject(AiService);

  messages         = signal<ChatMessage[]>([]);
  userInput        = signal('');
  isTyping         = signal(false);
  suggestedQs      = signal<string[]>([]);
  showSuggestions  = signal(true);
  private shouldScroll = false;

  canSend = computed(() =>
    this.userInput().trim().length > 0 && !this.isTyping()
  );

  ngOnInit(): void {
    // Load suggested questions
    this.aiService.getSuggestedQuestions().subscribe(qs => {
      this.suggestedQs.set(qs);
    });

    // Add welcome message
    this.addAiMessage({
      content: "Hi! 👋 I'm your Angular AI Helper. Ask me anything about Angular — components, signals, routing, services, RxJS, and more!\n\nI'll do my best to give you a clear answer with code examples.",
      codeExample: null,
      relatedTopics: [],
    });
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  onInputChange(value: string): void {
    this.userInput.set(value);
  }

  askQuestion(question: string): void {
    this.userInput.set(question);
    this.send();
  }

  send(): void {
    const q = this.userInput().trim();
    if (!q || this.isTyping()) return;

    // Hide suggestion chips after first message
    this.showSuggestions.set(false);

    // Add user message
    this.addUserMessage(q);
    this.userInput.set('');

    // Show typing indicator
    this.isTyping.set(true);
    this.addTypingIndicator();

    // Get AI response
    this.aiService.ask(q).subscribe(response => {
      // Remove typing indicator
      this.messages.update(msgs => msgs.filter(m => !m.isTyping));
      this.isTyping.set(false);

      // Add AI response
      this.addAiMessage(response);
    });
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  clearChat(): void {
    this.messages.set([]);
    this.showSuggestions.set(true);
    this.userInput.set('');
    this.isTyping.set(false);

    // Re-add welcome message
    this.addAiMessage({
      content: "Chat cleared! Ask me anything about Angular. 🚀",
      codeExample: null,
      relatedTopics: [],
    });
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  formatContent(text: string): string[] {
    return text.split('\n').filter(line => line !== '');
  }

  private addUserMessage(content: string): void {
    this.messages.update(msgs => [
      ...msgs,
      { id: crypto.randomUUID(), role: 'user', content, timestamp: new Date() },
    ]);
    this.shouldScroll = true;
  }

  private addAiMessage(data: Omit<ChatMessage, 'id' | 'role' | 'timestamp' | 'isTyping'>): void {
    this.messages.update(msgs => [
      ...msgs,
      { ...data, id: crypto.randomUUID(), role: 'ai', timestamp: new Date() },
    ]);
    this.shouldScroll = true;
  }

  private addTypingIndicator(): void {
    this.messages.update(msgs => [
      ...msgs,
      { id: 'typing', role: 'ai', content: '', timestamp: new Date(), isTyping: true },
    ]);
    this.shouldScroll = true;
  }

  private scrollToBottom(): void {
    try {
      this.chatEndRef?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } catch {}
  }
}
