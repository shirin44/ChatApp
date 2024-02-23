
import { ChatMessage } from "../app/chat/ui/chat";
import httpClient from "../util/http.client";

export const getChat = async (): Promise<string> => {  
    return await httpClient('chat', {
        method: 'GET'
    });  
}  


export const sendMessage = async (chat : ChatMessage): Promise<string> => {  
    return await httpClient('chat', {
        method: 'POST', 
        data: chat
    });  
}  

