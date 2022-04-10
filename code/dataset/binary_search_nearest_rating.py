import enum
import numpy as np
import pandas as pd

def binary_search_nearest(df, rating):
    # return nearest rating in the csv
    
    difficulty = df["difficulty"]
    left, right = 0, len(difficulty)-1
    while left < right:
        mid = (left + right) // 2
        if rating > difficulty[mid]:
            left =  mid + 1
        else:
            right = mid - 1
        # print (left, right)
    return left

if __name__ == '__main__':
    df = pd.read_csv("./words_lognormal.csv")
    print(df.iloc[[binary_search_nearest(df, 1300)]])

# print(data.loc[[2494]])

# init function
# WARNING: RANDOM VALUE GENERATOR!


# print(data)
# data.to_csv("./words3.csv")