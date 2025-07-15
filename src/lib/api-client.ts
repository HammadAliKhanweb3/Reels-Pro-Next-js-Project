import { IVideos } from "@/model/Videos";


export type vidoeFormData = Omit<IVideos, "_id">;

type FetchOptions={
method?:"GET" | "POST" | "PUT" | "DELETE",
body?:any,
headers?:Record<string,string>
}



class ApiClient{

    private async fetch<T>(
      endPoint: string,
      options: FetchOptions = {}
    ): Promise<T> {
        const { method = "GET", body, headers = {} } = options;

        const defaultHeaders = { 
            "Content-Type": "application/json",
            ...headers
        };

       

        const response = await fetch(`/api/${endPoint}`, {
            method,
            headers:defaultHeaders,
            body: body?JSON.stringify(body) : undefined
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        
        return response.json()
     }

     async getVideos (){
        return await this.fetch("/videos")
     } 
     async createVideos (videosData:vidoeFormData){
        return await this.fetch("/videos",{
            method:"POST",
            body:videosData
        })
     }    
    }


    export const apiClient = new ApiClient() 