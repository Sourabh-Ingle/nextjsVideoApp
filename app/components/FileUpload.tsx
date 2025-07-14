"use client" // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";
interface FileUploadProps{
    onSuccess: (res: any) => void
    onProgress: (progress: number) => void
    fileType?:"image"|"video"
        

}

const FileUpload = ({ onSuccess, onProgress ,fileType}:FileUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // Create an AbortController instance to provide an option to cancel the upload if needed.
    const abortController = new AbortController();

    //optional validation
    const validateFile = (file:File) => {
        if (fileType === "video") {
            if (!file.type.startsWith('video/')) {
                setError("Plaese upload valid file")
            }
        }
        return true;
    }

    const handleFileChanage=async(e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if (!file || !validateFile(file)) return
        setUploading(true);
        setError(null);

        try {
            const authRes = await fetch("/api/auth/imagekit-auth");
            const auth = await authRes.json(); 
            
            const uploadRes= await upload({
                // Authentication parameters
                file,
                fileName: file.name,
                publicKey: auth.publicKey,
                signature:auth.signature,
                expire:auth.expire,
                token:auth.token,
                
                
               
                 onProgress: (event) => {
                     if (event.lengthComputable && onProgress) {
                         const percent = (event.loaded / event.total) * 100;
                         onProgress(Math.round(percent))
                     }
                     
                    
                },
                 abortSignal: abortController.signal,
            });

            onSuccess(uploadRes)
       

        } catch (error) {
            console.error("Upload Failed", error)
        } finally {
            setUploading(false)
        }
    }

   

    return (
        <>
            <input
                type="file"
                accept={fileType === "video" ? "video/*" : "image/*"}
                onChange={handleFileChanage}
            />
            {  uploading &&
             <span>Loading....</span>
            }
        </>
    );
};

export default FileUpload;