export class validations
{
email(input:string)
{
let rexmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(input.match(rexmail))
{
  return true;  
}
else{
    return false;
}
}
phoneno(input:string)
{
    let rexpno=/^\d{10}$/;
    if(input.match(rexpno))
    {
        console.log("true");
      return true;  
    }
    else{
        console.log("false");
        return false;
    } 
}
notempty(input:string)
{
    let rexnn=/([^\s])/;
    if(input.match(rexnn))
    {
        console.log("true");
      return true;  
    }
    else{
        console.log("false");
        return false;
    }
}
}