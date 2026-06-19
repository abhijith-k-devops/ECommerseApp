# Poppins Font Files

Please download the Poppins font files from Google Fonts and place them in this directory:

1. Visit: https://fonts.google.com/specimen/Poppins
2. Click "Get font" and "Download all"
3. Extract the ZIP file
4. Copy these font files to this folder:
   - Poppins-Light.ttf
   - Poppins-Regular.ttf
   - Poppins-Medium.ttf
   - Poppins-SemiBold.ttf
   - Poppins-Bold.ttf

After adding the fonts, run:
```bash
npx react-native-asset
```

Then rebuild the app:
```bash
# For iOS
cd ios && pod install && cd ..
npm run ios

# For Android
npm run android
```
