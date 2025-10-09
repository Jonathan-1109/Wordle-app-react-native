# Wordle – React Native Expo, Express & MongoDB
A Wordle built with React Native Expo, Express and MongoDB, available in English and Spanish.

## Instructions

1. Clone the Repository
```
git clone https://github.com/Jonathan-1109/Wordle-app-react-native.git
cd wordle-app-react-native
```
2. Install Dependencies
```
cd wordle
npm install

cd ../Backend
npm install
```

The game is fully playable once the dependencies in Wordle are installed (see step 5). 
To enable login functionality, you need to configure the environment variables and set up the backend.

3. Environment Variables

Create a cluster and a database in MongoDB 

Create and configure the environment variables (.env) using the .env.example files in the backend and wordle folders

4. Running the Backend
```
npm run server
```
The generated URL (e.g., http://localhost:3000/api) should be used in the .env file of Wordle as EXPO_PUBLIC_API_URL.

5. Running the App

Navigate to the wordle directory and run: 
```
npm run web
npm run android
npm run ios
```
