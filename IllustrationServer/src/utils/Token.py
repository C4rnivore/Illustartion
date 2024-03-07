import jwt

def CreateToken(data, secret, algorithm='HS256'):
    encoded_jwt = jwt.encode(data, secret, algorithm)
    return encoded_jwt

def DecodeToken(encoded, secret, algorithm='HS256'):
    decoded_jwt = jwt.decode(encoded, secret, algorithm)
    return decoded_jwt