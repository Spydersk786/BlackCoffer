from flask import Flask, jsonify
from pymongo import MongoClient

MONGO_URI = 'mongodb+srv://shivam:shivam28@project1.kja17z2.mongodb.net/' 
DATABASE_NAME = "BlackCoffer" 
COLLECTION_NAME = "data" 

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)