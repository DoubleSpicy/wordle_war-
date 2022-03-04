class user():
    def __init__(self, id, elo):
        self._id = id
        self._elo = elo
        self._status = None
        self._is_admin = False

class admin():
    def __init__(self, id, elo, auth):
        user.__init__(self, id, elo)
        self.set_admin(auth)

    def set_admin(auth):
        pass
