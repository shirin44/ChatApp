import { ChatMessage } from "../app/chat/ui/chat";
import httpClient from "../util/http.client";

export const getChat = async (currentUserId: string, receiverId: string): Promise<ChatMessage[]> => {
  if (!currentUserId || !receiverId) return [];
  return await httpClient(`chat/${currentUserId}/${receiverId}`, {
    method: "GET",
  });
};

export const sendMessage = async (chat: ChatMessage): Promise<string> => {
  return await httpClient("chat", {
    method: "POST",
    data: chat,
  });
};
