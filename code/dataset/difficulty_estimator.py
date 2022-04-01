import numpy as np
import pandas as pd

data = pd.read_csv("5_letters.csv")
# print(data.loc[[2494]])

# init function
# WARNING: RANDOM VALUE GENERATOR!
difficulty = np.random.rand(1, data.shape[0])
# print(difficulty)
data.insert(data.shape[1], "difficulty", difficulty.T, True)
print(data)
data.to_csv("./words.csv")