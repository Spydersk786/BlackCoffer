from flask import Flask, jsonify, request
from pymongo import MongoClient

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
        # Get query parameters
        end_year = request.args.get('end_year')
        topic = request.args.get('topic')  # Only allows a single topic (e.g., ?topic=topic1)
        sector = request.args.get('sector')
        region = request.args.get('region')
        source = request.args.get('source')
        country = request.args.get('country')
        
        # Build the query based on provided filters
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

        print(query)
        # Query the database
        results = list(collection.find(query))

        # Convert the MongoDB cursor to a JSON-compatible list
        formatted_results = [{key: str(value) for key, value in doc.items() if key != '_id'} for doc in results]

        return jsonify(formatted_results), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
