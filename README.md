# Bio Sortify

## Overview
Bio Sortify is a machine learning model trained to classify waste as either biodegradable or non-biodegradable. The model boasts an impressive accuracy of **98.8%**. This project was developed for Philly Codefest 2024, where the theme was "AI for Common Good". 

## Web Interface
A user-friendly website was built using **HTML**, **CSS**, and **JavaScript**to interact with the model. The website supports both image classification and real-time classification. We used **FastAPI** to connect the model to the website, ensuring a seamless and efficient interaction between the user interface and the machine learning model.

## Model Training
The model was trained on a dataset of **250,000 images** sourced from Kaggle. We used **AWS Sagemaker** for training, leveraging transfer learning on **ImageNet V2**, where we got a test accuracy of **98.8%**. Initially, we attempted to train the model using a Convolutional Neural Network (CNN), but the training process was lengthy and the accuracy was only 86.54%. Therefore, we decided to use AWS Sagemaker, which also happened to be a sponsor for Philly Codefest.

## Team
Bio Sortify was brought to life by a team of six hardworking and enthusiastic individuals:
- Meghna Rajbhandari
- Saksham Rajbhandari
- Krithi Hari
- Evan Toomey
- Vruj Patel
- Uditi Shah

## Acknowledgements
We would like to express our gratitude to Philly Codefest 2024 for providing us with the opportunity to work on this project. We would also like to thank AWS Sagemaker for their support.

## Future Work
We are continuously working on improving the model's accuracy and the website's user experience.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
