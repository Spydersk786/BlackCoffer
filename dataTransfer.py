from pymongo import MongoClient
import json

MONGO_URI = 'mongodb+srv://shivam:shivam28@project1.kja17z2.mongodb.net/' 
DATABASE_NAME = "BlackCoffer" 
COLLECTION_NAME = "data" 

client = MongoClient(MONGO_URI)

db = client[DATABASE_NAME]

collection = db[COLLECTION_NAME]

try:
    with open('jsondata.json', 'r', encoding='utf-8') as file:
        data = json.load(file)  
    
    if isinstance(data, list):
        result = collection.insert_many(data)
        print(f"Data inserted successfully with IDs: {result.inserted_ids}")
    else:
        print("The JSON file does not contain a list of objects.")
except Exception as e:
    print(f"An error occurred: {e}")

client.close()
