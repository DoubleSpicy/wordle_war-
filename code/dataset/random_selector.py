import numpy as np
import pandas as pd
import random



class user():
    def __init__(self):
        self.elo = np.random.randint(0, 3500)

df = pd.open_csv("./words.csv")

        