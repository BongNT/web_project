@router.post('/login')
def login(request: request_data.LoginData, status_code=status.HTTP_202_ACCEPTED):
    # find user in database
    # check password
    # return type user, (session)
    return {}


@router.post('/logout')
def logout():
    # delete session
    return {}