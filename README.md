# Wordle Clone – React Native Expo & MongoDB
A Wordle clone built with React Native Expo and MongoDB, available in English and Spanish.

## Instructions

1. Clone the Repository
```
git clone https://github.com/Jonathan-1109/Wordle-react-native.git
cd wordle-react-native
```
2. Install Dependencies
```
cd wordle-de-estructura
npm install

cd ../Backend
npm install
```

The game is fully playable once the dependencies in wordle-de-estructura are installed (see step 5). 
To enable login functionality, you need to configure the environment variables and set up the backend.

3. Environment Variables

Create a cluster and a database in MongoDB <br>
Create and configure the environment variables (.env) using the .env.example files in the backend and wordle-de-estructura folders

4. Running the Backend
```
npm run server
```
The generated URL (e.g., http://localhost:3000/api) should be used in the .env file of wordle-de-estructura as EXPO_PUBLIC_API_URL.

5. Running the App

Navigate to the wordle-de-estructura directory and run: 
```
npm run web
npm run android
npm run ios
```
