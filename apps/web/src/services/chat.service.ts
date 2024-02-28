
import { ChatMessage } from "../app/chat/ui/chat";
import httpClient from "../util/http.client";

export const getChat = async (id :string): Promise<ChatMessage[]> => {
    return await httpClient('chat/'+ id, {
      method: 'GET'
    });  
  }
   


export const sendMessage = async (chat : ChatMessage): Promise<string> => {  
    return await httpClient('chat', {
        method: 'POST', 
        data: chat
    });  
}  

