import { JobFormValues } from "@/app/dashboard/recruiter/manage-jobs/new/page";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const CreateJob = async(data: JobFormValues) => {

    const res = await fetch (`${BASE_URL}/jobs`, {
        method: "POST",
        headers : {
            'content-type' : 'application/json',
        },
        body : JSON.stringify(data),
    })
    return res.json();

}


export const DeleteJob = async (jobId : string) => {
    const  res = await fetch (`${BASE_URL}/jobs/${jobId}` , {
        method : 'DELETE',
    })
    return res.json();
}

