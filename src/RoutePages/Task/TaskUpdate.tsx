export interface TaskUpdate{
    taskId:number,
    userId:string,
    title:string,
    description:string,
    priority:string,
    developerId:string,
    estimatedTime:number,
    actualTime:number
}