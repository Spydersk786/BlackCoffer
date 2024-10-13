from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime

MONGO_URI = 'mongodb+srv://shivam:shivam28@project1.kja17z2.mongodb.net/' 
DATABASE_NAME = "BlackCoffer" 
COLLECTION_NAME = "data" 

app = Flask(__name__)
CORS(app)  # Allow all origins (for development only)

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
collection = db[COLLECTION_NAME]


def item_to_dict(item):
    item["id"] = str(item["_id"])
    del item["_id"]
    return item

@app.route('/data', methods=['GET'])
def get_items():
    try:
        items = list(collection.find())
        items_dict = {str(i): item_to_dict(item) for i, item in enumerate(items)}
        return jsonify(items_dict), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/countUnique/<field_name>', methods=['GET'])
def count_entries(field_name):
    try:
        pipeline = [
            {
                '$match': {
                    field_name: {'$ne': ''}  # Skip documents where the field is an empty string
                }
            },
            {
                '$group': {
                    '_id': f"${field_name}",
                    'count': { '$sum': 1 }
                }
            },
        ]
        
        results = list(collection.aggregate(pipeline))

        if not results:
            return jsonify({ "field": field_name, "count": 0 }), 200

        formatted_results = [{ "value": str(entry['_id']), "count": entry['count'] } for entry in results]

        return jsonify(formatted_results), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/filter', methods=['GET'])
def filter_data():
    try:
        end_year = request.args.get('end_year')
        topic = request.args.get('topic') 
        sector = request.args.get('sector')
        region = request.args.get('region')
        source = request.args.get('source')
        country = request.args.get('country')
        pestle = request.args.get('pestle')
        
        query = {}
        
        if end_year:
            query['end_year'] = int(end_year)
        if topic:
            query['topic'] = topic 
        if sector:
            query['sector'] = sector
        if region:
            query['region'] = region
        if source:
            query['source'] = source
        if country:
            query['country'] = country
        if pestle:
            query['pestle'] = pestle

        print(query)

        results = list(collection.find(query))

        formatted_results = [{key: str(value) for key, value in doc.items() if key != '_id'} for doc in results]

        return jsonify(formatted_results), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/top-five', methods=['GET'])
def get_top_five():
    try:
        field = request.args.get('field')
        
        allowed_fields = ['intensity', 'end_year', 'likelihood','relevance']

        if field not in allowed_fields:
            return jsonify({"error": f"Field must be one of {allowed_fields}"}), 400
        
        query = {field: {"$type": ["double", "int"]}}

        results = list(collection.find(query).sort(field, -1).limit(5))

        formatted_results = [{key: str(value) for key, value in doc.items() if key != '_id'} for doc in results]

        return jsonify(formatted_results), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/value-aggregation/intensity', methods=['GET'])
def value_aggregation_intensity():
    try:
        column_name = 'intensity'

        # Aggregate unique values and their counts, ignoring string types
        data = collection.aggregate([
            {
                "$match": {
                    column_name: {"$type": "number"}  # Ensures we only consider numeric values
                }
            },
            {
                "$group": {
                    "_id": f"${column_name}",
                    "count": {"$sum": 1}
                }
            }
        ])

        # Initialize counters for each range
        range_0_10 = 0
        range_11_30 = 0
        range_31_50 = 0
        range_greater_50 = 0

        # Iterate through the aggregated data and categorize it
        for item in data:
            value = item["_id"]
            count = item["count"]

            if value <= 10:
                range_0_10 += count
            elif 11 <= value <= 30:
                range_11_30 += count
            elif 30 <= value <= 50:
                range_31_50 += count
            else:
                range_greater_50 += count

        # Return the counts as a JSON object
        result = {
            "0_10": range_0_10,
            "11_30": range_11_30,
            "31_50": range_31_50,
            "greater_50": range_greater_50
        }

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/value-aggregation/relevance', methods=['GET'])
def value_aggregation_relevance():
    try:
        # Replace 'column_name' with the name of your column
        column_name = 'relevance'
        # Ensure the column name is provided
        
        data = collection.aggregate([
            {
                "$match": {
                    column_name: {"$type": "number"}  # Ensures we only consider numeric values
                }
            },
            {
                "$group": {
                    "_id": f"${column_name}",
                    "count": {"$sum": 1}
                }
            }
        ])

        # Initialize counters for each range
        range_0_3 = 0
        range_4_7 = 0
        range_8_10 = 0

        # Iterate through the aggregated data and categorize it
        for item in data:
            value = item["_id"]
            count = item["count"]

            if value <= 3:
                range_0_10 += count
            elif 4 <= value <= 7:
                range_11_30 += count
            else: 
                range_31_50 += count


        # Return the counts as a JSON object
        result = {
            "0_3": range_0_3,
            "4_7": range_4_7,
            "8_10": range_8_10
        }

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/value-aggregation/likelihood', methods=['GET'])
def value_aggregation_likelihood():
    try:
        # Replace 'column_name' with the name of your column
        column_name = 'likelihood'

        # Aggregate unique values and their counts, ignoring string types
        data = collection.aggregate([
            {
                "$match": {
                    column_name: {"$type": "number"}  # Ensures we only consider numeric values
                }
            },
            {
                "$group": {
                    "_id": f"${column_name}",
                    "count": {"$sum": 1}
                }
            }
        ])

        # Initialize counters for each range
        like1 = 0
        like2 = 0
        like3 = 0
        like4 = 0

        # Iterate through the aggregated data and categorize it
        for item in data:
            value = item["_id"]
            count = item["count"]

            if value == 1:
                like1 += count
            elif value == 2:
                like2 += count
            elif value == 3:
                like3 += count
            else:
                like4 += count

        # Return the counts as a JSON object
        result = {
            "1": like1,
            "2": like2,
            "3": like3,
            "4": like4
        }

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/future-predictions', methods=['GET'])
def future_predictions():
    try:
        # Parse the 'limit' parameter if provided to limit the number of results
        limit = int(request.args.get('limit', 5))

        current_year = datetime.now().year

        results = list(collection.find(
            {"end_year": {"$gt": current_year}}
        ).sort("end_year", 1).limit(limit))


        formatted_results = [{key: value for key, value in doc.items() if key != '_id'} for doc in results]

        return jsonify(formatted_results), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
