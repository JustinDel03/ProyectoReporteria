// src/app/services/conversation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Conversation } from '../interfaces/conversation.interface';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private apiUrl = `${environment.apiUrl}/conversations`;

  constructor(private http: HttpClient) { }

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(this.apiUrl);
  }

  getConversationById(conversationId: string): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.apiUrl}/${conversationId}`);
  }
}
