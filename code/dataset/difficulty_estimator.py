import numpy as np
import pandas as pd
from scipy.stats import truncnorm
import matplotlib.pyplot as plt

# script to init difficulty values in a prob distribution

def get_truncated_normal(mean=0, sd=1, low=0, upp=10):
    # truncnorm helper function
    # difficulty = truncnorm.rvs(-1500/375, 1500/375, loc=1500, scale=375, size=len(difficulty))
    return truncnorm(
        (low - mean) / sd, (upp - mean) / sd, loc=mean, scale=sd)

df = pd.read_csv("./5_letters.csv")
difficulty = [0]*df.shape[0]

difficulty = np.random.lognormal(np.log(1500), 0.25, len(difficulty))

# sort and output to .csv
df.insert(df.shape[1], "difficulty", difficulty.T, True)
sort_df = df.sort_values(by=["difficulty"], ascending = True)
plt.plot(np.arange(0, 2499, 1), difficulty)
plt.show()
sort_df.to_csv("./words_lognormal.csv")
# print(difficulty)
# data.insert(data.shape[1], "difficulty", difficulty.T, True)
# print(data)
# data.to_csv("./words2.csv")