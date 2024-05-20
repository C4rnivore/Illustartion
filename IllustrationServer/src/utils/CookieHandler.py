import datetime
from fastapi import Response

def set_cookie_to_response(response:Response, _key:str, _value:str, _samesite:str = 'lax', _secure:bool = False, _httponly:bool = True, max_age_days:int = 30 )->Response:
    response.set_cookie(key = _key,
                        value=_value,
                        samesite=_samesite,
                        secure=_secure,
                        httponly=_httponly,
                        max_age=datetime.datetime.now() + datetime.timedelta(days=max_age_days))
    return response
