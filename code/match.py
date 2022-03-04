# a simple python skeleton
import player




class match():
    def __init__(self, match_id, player_a: player, player_b: player, initial_time: timer):
        self._match_id = match_id
        self._players = [player_a, player_b]
        self._time_left = [initial_time, initial_time]
        self._running = True
        
    @property
    def get_match_id(self):
        return self._match_id
    
    @property
    def get_players(self):
        return self._players

    def _check_times_up(self):
        # return True in the list if any of them time's up, should not be directly called!
        res = [False, False]
        for i in range(0, 2):
            if self._time_left[i] <= 0:
                res[i] = True
        return res

    def reduce_time(self, target, amount):
        if not (target in range(0, 2)):
            print("Target must be in range 0 to 1!")
        if amount <= 0:
            print("Amount must be > 0!")
        self._time_left[target] -= amount

        is_dead = self._check_times_up()
        for i in is_dead:
            if i == True:
                self._running = False
        
