// src/lib/api.ts
export async function uploadFiles(files: File[], modelName: string) {
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));
    formData.append("model_name", modelName);
  
    const res = await fetch("https://e3d0-39-118-216-92.ngrok-free.app/api/rag/upload", {
      method: "POST",
      body: formData,
    });
  
    return res.json();
  }
  
  export async function sendPrompt(prompt: string) {
    const res = await fetch(`https://e3d0-39-118-216-92.ngrok-free.app/api/rag/query?prompt=${encodeURIComponent(prompt)}`);
    const data = await res.json();
    return data.response;
  }
  