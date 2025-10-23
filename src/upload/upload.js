// Import necessary Firebase Admin SDK modules
const admin = require('firebase-admin');

// Import your service account key
const serviceAccount = require('./clothing-store-3adb7-firebase-adminsdk-fbsvc-c6f2f411bd.json');

// Initialize the Firebase Admin App
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Get a reference to the Firestore database
const db = admin.firestore();

// Import the data from your JSON file
const products = require('./polo.json');

// Get a reference to the target collection
// Path: product (collection) -> catalog (document) -> casual (collection)
const collectionRef = db.collection('product').doc('catalog').collection('polo');

// Function to upload the data
async function uploadData() {
    console.log('Starting data upload...');

    // Use a for...of loop to handle async operations correctly
    for (const product of products) {
        try {
            // The add() method automatically creates a document with a unique ID
            await collectionRef.add(product);
            console.log(`Added: ${product.name}`);
        } catch (error) {
            console.error(`Error adding ${product.name}: `, error);
        }
    }

    console.log('Data upload complete! 🎉');
}

// Run the upload function
uploadData();