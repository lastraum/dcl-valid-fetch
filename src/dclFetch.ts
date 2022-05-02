import { signedFetch } from "@decentraland/SignedFetch"

export enum dclFetchMethod {
  GET,
  POST
}

export type dclFetchData ={
  link?: string,
  method?: dclFetchMethod,
  body?: any,
  auth?: string
}

export type dclFetchResponse = {
  valid: boolean,
  msg: string,
  data:any
}

export async function dclFetch(fetchData?:dclFetchData) {

  let res:dclFetchResponse = {valid: false, msg:"", data:{}}
  let valid:boolean
  let msg: string

    if(fetchData){
      if(!fetchData!.auth){
        valid = false
        msg = "Incorrect or missing auth token and data object"
        return res
      }
    }

  try{
    let response = await signedFetch('https://lkdcl.co/dcl/validator/validate',{
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(fetchData)
          })
    let json
    if (response.text) {
      json = await JSON.parse(response.text)
      log('json is', json)

      if(json){
        res.valid = json.valid
        res.msg = json.msg
        res.data = json.data
        return res
      }
      else{
        res.valid = json.valid
        res.msg = json.msg
        return res
    }
    }
    else{
      res.valid = false
      res.msg = "JSON error"
      return res
    }
  }
  catch(e){
      log('error is => ', e)
      res.valid = false
      res.msg = "e"
      return res
  }
}