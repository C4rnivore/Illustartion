import bcrypt

def HashPswd(password:str):
    pwhash = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
    password_hash = pwhash.decode('utf8')
    return password_hash

def CheckPswd(password, hashed):
    return bcrypt.checkpw(bytes(password, 'utf-8'), bytes(hashed, 'utf-8'))