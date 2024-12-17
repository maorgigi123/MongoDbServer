# שלב 1: הגדרת בסיס התמונה
FROM node:18 AS build

# שלב 2: הגדרת תיקיית העבודה בתוך הקונטיינר
WORKDIR /app

# שלב 3: העתקת קבצי package.json ו- package-lock.json כדי להתקין את התלויות
COPY package*.json ./

# שלב 4: התקנת תלויות בפרודקשן
RUN npm install --production

# שלב 5: העתקת קבצי הקוד לפרויקט לתוך הקונטיינר
COPY . .

# שלב 6: הפעלת השרת (אם אין צורך בבניית TypeScript)
CMD ["npm", "start"]

# שלב 7: חשיפת הפורט בו יפעל השרת
EXPOSE 3001

# for build  :  docker build -t my-node-app .

#for run  : docker run -p 3001:3001 my-node-app

#for stop all docker images : docker stop $(docker ps -q)

#convarte to tar =>  docker save my-node-app > my-node-app.tar
# convarte to zip =>  zip my-node-app.zip my-node-app.tar