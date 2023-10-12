from fastapi import FastAPI, Request
import uvicorn
import rapidjson
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
from compute import functions
from config.global_func_variables import InitialValues as initialValue
import time
import concurrent.futures

# Config
app = FastAPI()
app.json_encoder = rapidjson.Encoder()
app.json_decoder = rapidjson.Decoder()
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['*'], allow_headers=['*'])

_FuncVars = initialValue()

@app.post("/search")
async def getCRUXData(req: Request):

    try:
        _FuncVars.reset()
        _FuncVars.INpayload = await req.json()
        if _FuncVars.statusCode == 200:
            data = await functions.cruxDATA(_FuncVars)

    except Exception as err:
        _FuncVars.logger.info("Payload error")
        _FuncVars.statusCode = 205
        _FuncVars.error = str(err)

    if (_FuncVars.statusCode in {205, 204, 202, 201}):
        _FuncVars.OUTpayload["statusCode"] = _FuncVars.statusCode
        _FuncVars.OUTpayload["error"] = _FuncVars.error
        
    else:
        _FuncVars.OUTpayload["statusCode"] = 200
        _FuncVars.OUTpayload["error"] = _FuncVars.error
        if data:
            _FuncVars.OUTpayload['data'] = data
    return _FuncVars.OUTpayload

if __name__ == "__main__":
    uvicorn.run("Runner:app", host="0.0.0.0",port=8080, reload=True, access_log=False)
