from flask_cors import CORS
import pandas as pd
import os
from flask import Flask, jsonify
# Flask Setup: Initialize the Flask app.
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5000"}})
df = pd.read_csv('final.csv')
#define destination api.
@app.route("/api/v1.0/population/<year>")
def population(year):
    population_year = df[df['year'] == int(year)]
    print(population_year)
    data_dic = [{'year':x['year'], 'lat': x["lat"], 'lon': x['lon'], 'population': x['population'], 'zip_code': x['zip_code']} for _,x in population_year.iterrows()]

    return jsonify(data_dic)

if __name__ == '__main__':
    app.run(debug=True)
