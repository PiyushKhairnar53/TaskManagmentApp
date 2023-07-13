export const loading = (bool:any)=>{
    return bool ? {
      type:"SHOW_LOADER",
      data:bool
    }: {
      type: "HIDE_LOADER",
      data: bool
    }
  }