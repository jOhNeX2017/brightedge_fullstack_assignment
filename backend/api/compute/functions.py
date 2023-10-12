import asyncio
import base64
import json
from io import BytesIO
from config.config_utility import get_config
import gc
import httpx

from math import sqrt


def isReqValid(_FuncVars, mapping):

    for reqAttr in mapping:

        if reqAttr not in _FuncVars.INpayload:
            _FuncVars.statusCode = 202
            _FuncVars.error = "Required value does not exist in the payload"
            return

    return 200


async def process_data(data):
    if data:
        record = data.get("record")
        metrics_data = record.get("metrics")
        collection_period = record.get("collectionPeriod")

        return {"metric": metrics_data, "collection_period": collection_period}
    else:
        return None


async def cruxDATA(_FuncVars):
    try:
        if not isReqValid(_FuncVars, ["searchParam"]):
            return

        searchParam = _FuncVars.INpayload.get('searchParam')

        GOOGLE_API_KEY = get_config('google_api_key')
        GOOGLE_API_URL = get_config('crux_api_url')
        

        final_res = {}
        error_url = []

        if type(searchParam) == list:
            crux_url = f'{GOOGLE_API_URL}?key={GOOGLE_API_KEY}'
            request_data = {
                "formFactor": "DESKTOP"
            }
            for site in searchParam:
                request_data['origin'] = site

                try:
                    # Calling the google crux api to get metrics regarding the site
                    async with httpx.AsyncClient() as client:
                        response = await client.post(crux_url, json=request_data)
                    
                    if response.status_code == 200:
                        data = json.loads(response.text)
                        
                        # Process the data from the POST response
                        processed_data = await process_data(data)
                        
                        #setting the final response in dictionary object
                        final_res[site] = processed_data
                        
                    else:
                        error_url.append(site)
                except Exception as err:
                    error_url.append(site)
        else:
            _FuncVars.statusCode = 205
            _FuncVars.error = "searchParam is not in array"

    except Exception as err:
        _FuncVars.statusCode = 205
        _FuncVars.error = str(err)
    gc.collect()
    
    if len(error_url)>0:
        if len(error_url) == len(searchParam):
            _FuncVars.statusCode = 205
            _FuncVars.error = "Error in getting CRUX data of URL"
        else:
            _FuncVars.error = error_url
    
    return final_res
