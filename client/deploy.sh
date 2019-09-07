git add . &&
git commit -m "refactor" &&
git push origin master &&
npm run build &&
cd build &&
mv index.html 200.html &&
npx surge --domain http://crave.surge.sh