import re
password ="N82001"
print(re.fullmatch(r'[A-Za-z0-9@#$%^&+=]{8,}', password))
print(re.match(r'[@#$%^&+=]{0,}', password))
if len(password)<=8:
    print("password too short")
if re.match(r'[@#$%^&+=]{8,}', password):
    print(password)
if re.fullmatch(r'[@#$%^&+=]{,}', password):
    print("Invalid password")

