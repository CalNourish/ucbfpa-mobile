# UC Berkeley Food Pantry Mobile App

## Setup

This project uses Expo's React Native managed app workflow. To setup, follow the installation instructions
[here](https://docs.expo.io/versions/latest/introduction/installation/).

To develop the app (starting a development server, making changes), follow the instructions
[here](https://docs.expo.io/versions/latest/workflow/up-and-running/).

## Environment

This project follows [this guide](https://alxmrtnz.com/thoughts/2019/03/12/environment-variables-and-workflow-in-expo.html)
for environment setup.

## Firebase

This project uses Firebase as a backend. To set up Firebase on Expo, [this guide](https://docs.expo.io/versions/latest/guides/using-firebase/) was used.

## Notifications

This project uses the following resources as a guide.

- [Push Notifications](https://docs.expo.io/versions/v34.0.0/guides/push-notifications/)
- [Using FCM For Push Notifications](https://docs.expo.io/versions/v34.0.0/guides/using-fcm/)
- [Notification Channels](https://docs.expo.io/versions/latest/guides/notification-channels/)

One major caveat: Expo can only accept one FCM server key and one ```google-services.json```. Therefore, the production key is uploaded. Therefore, Android phones will not receive notifications on the dev environment.

iOS phones will work in either environment.
