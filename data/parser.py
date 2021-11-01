import json
import csv
from collections import defaultdict

def vostok():
    with open('data/ice-cores-data-pack/Vostok-tpt-co2.csv') as f:
        vostok_lines = f.readlines()
    print(vostok_lines[773])
    co2_lines = vostok_lines[86:4203]
    timeseries_array = []
    for l in co2_lines:
        split = l.split(',')
        age = int(-float(split[0]))
        temp = float(split[1])
        co2 = float(split[2])
 
        timeseries_array.append({'age':age, 'co2':co2, 'temp':temp})

    with open('data/vostok_temp_co2.json', 'w') as outfile:
        json.dump({'timeseries':timeseries_array}, outfile)

def noaa_co2():
    with open('data/antarctica2015co2composite.txt') as f:
        lines = f.readlines()
    with open('data/co2_annmean_gl.txt') as f:
        recent_lines = f.readlines()
    co2_lines = lines[138:2039]
    recent_co2_lines = recent_lines[57:98]
    print('1111',co2_lines[0])
    print('2222,',recent_co2_lines[0])
    age_array = []
    co2_array = []
    timeseries_array = []
    for l in recent_co2_lines:
        split = l.split()
        age = 2021 - int(split[0])
        co2 = float(split[1])
        age_array.append(age)
        co2_array.append(co2)
        timeseries_array.append({'age':age, 'co2':co2})
    for l in co2_lines:
        split = l.split()
        age = int(float(split[0]) + (2015-1950))
        co2 = float(split[1])
        age_array.append(age)
        co2_array.append(co2)
        timeseries_array.append({'age':age, 'co2':co2})

    timeseries_array = sorted(timeseries_array, key=lambda d: d['age']) 

    with open('data/noaa_co2.json', 'w') as outfile:
        json.dump({'age':age_array, 'co2':co2_array, 'units':'age(yrBP), (co2 (ppmv)', 'timeseries':timeseries_array}, outfile)

def pathways():
    with open('data/iam_ssp_predictions.csv') as f:
        lines = f.readlines()
    prediction_lines = lines[1:23]
    years = [2010,2020,2030,2040,2050,2060,2070,2080,2090,2100]
    timeseries_dict = defaultdict(dict)
    for line in prediction_lines:
        split = line.split(',')
        model = split[0]
        scenario = split[1]
        region = split[2]
        variable = split[3]
        unit = split[4]
        predicted_temps = split[6:16]
        print(predicted_temps)
        notes = split[16]
        for i, value in enumerate(predicted_temps):
            timeseries_dict[years[i]][scenario+'-'+model] = float(value )
    for year in years:
        timeseries_dict[year]['year'] = int(year)

    timeseries_array = [timeseries_dict[year] for year in years]
    print(timeseries_array)
    with open('data/iam_projections.json', 'w') as outfile:
        json.dump({'timeseries':timeseries_array}, outfile)


# noaa_co2()
# vostok()
pathways()