export async function GetData(relUrl: string, authId: null | string = null)
{
  const apiUrl = `https://api.spacetraders.io/v2${relUrl}`;
  let requestInit;
  
  if (authId)
  {
    requestInit = {
      headers: {  
        Accept: 'applicaton/json',
        Authorization: `Bearer ${authId}`
      }
    }
  } 
  else
  {
    requestInit = {
    headers: {  Accept: 'applicaton/json'  }
    }
  }


  const firstPageResp = await fetch(apiUrl, requestInit);
  const json = await firstPageResp.json();

  return json.data;
}

export async function GetDataList(relUrl: string, authId: null | string = null)
{
  const apiUrl = `https://api.spacetraders.io/v2${relUrl}?limit=20`;
  let requestInit
  
  if (authId)
  {
    requestInit = {
      headers: {  
        Accept: 'applicaton/json',
        Authorization: `Bearer ${authId}`
      }
    }
  } 
  else
  {
    requestInit = {
    headers: {  Accept: 'applicaton/json'  }
    }
  }

  const firstPageResp = await fetch(apiUrl, requestInit);
  const json = await firstPageResp.json();

  console.log('meta data: ');
  console.log(json.meta);

  const numberOfPages = Math.ceil(json.meta.total/20);

  const data = json.data;

  if (numberOfPages == 1) return data;

  const respArray = [];

  for (let i=2; i<=numberOfPages; i++)
  {
    const pageResp = await fetch(`${apiUrl}&page=${i}`, requestInit);
    respArray.push(pageResp);
  }
  
  const completeResponse = await Promise.all(respArray);
  const completeJson = await Promise.all(completeResponse.map(resp => resp.json()));

  const completeData = data.concat(...completeJson.map(json => json.data));
  return completeData;
}

export async function PostData(relUrl: string, bodyObject: unknown, authId: string | null = null)
{
  const apiUrl = `https://api.spacetraders.io/v2${relUrl}`;

  const requestInit = {
    method: 'POST',
    headers: {  
      Accept: 'applicaton/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(bodyObject)
  };

  if (authId)
  {
    requestInit.headers.Authorization = `Bearer ${authId}`
  }

  console.log(requestInit);

  const resp = await fetch(apiUrl, requestInit);
  const json = await resp.json();

  const returnData = {
    respStatus: resp.status,
    data: json.data
  }

  return returnData

}
