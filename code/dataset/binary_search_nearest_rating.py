import numpy as np
import pandas as pd

df = pd.read_csv("5_letters.csv")
sort_df = df.sort_values(by=["difficulty"], ascending = True)
print (sort_df[sort_df["difficulty"] < 0]) 
# print(data.loc[[2494]])

# init function
# WARNING: RANDOM VALUE GENERATOR!


# print(data)
# data.to_csv("./words3.csv")