import json

vostok_columns = ['Depth', 'Age', 'CO2',]
with open('data/co2 ice core data.txt') as f:
    vostok_lines = f.readlines()
print(vostok_lines[773])
co2_lines = vostok_lines[774:1869]
age_array = []
co2_array = []
for l in co2_lines:
    split = l.split()
    age_array.append(int(split[0]))
    co2_array.append(float(split[1]))

with open('data/co2.json', 'w') as outfile:
    json.dump({'age':age_array, 'co2':co2_array, 'units':'age(yrBP), (co2 (ppmv)'}, outfile)